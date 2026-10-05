using System;
using System.IO;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsBridgeServer
    {
        public const int ProtocolVersion = 1;
        public const string WebSocketProtocol = "etabs-bridge-v1";
        private const int MaxRequestBytes = 16 * 1024 * 1024;
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter() }
        };

        private readonly IEtabsApiInvoker _invoker;
        private readonly string _prefix;
        private readonly string _authProtocol;
        private HttpListener _listener;
        private CancellationTokenSource _shutdown;
        private Task _listenTask;

        public EtabsBridgeServer(EtabsApiInvoker invoker, string authToken, string prefix = "http://localhost:5006/")
            : this((IEtabsApiInvoker)invoker, authToken, prefix)
        {
        }

        public EtabsBridgeServer(IEtabsApiInvoker invoker, string authToken, string prefix = "http://localhost:5006/")
        {
            _invoker = invoker ?? throw new ArgumentNullException(nameof(invoker));
            if (string.IsNullOrWhiteSpace(authToken)) throw new ArgumentException("Missing bridge authentication token.", nameof(authToken));
            _prefix = prefix;
            _authProtocol = "auth." + authToken;
        }

        public bool IsRunning => _listener != null && _listener.IsListening;

        public void Start()
        {
            if (IsRunning) return;

            _listener = new HttpListener();
            _listener.Prefixes.Add(_prefix);
            _listener.Start();
            _shutdown = new CancellationTokenSource();
            _listenTask = ListenLoop(_listener, _shutdown.Token);
        }

        public void Stop()
        {
            if (_listener == null) return;

            _shutdown?.Cancel();

            if (_listener.IsListening)
            {
                _listener.Stop();
            }

            _listener.Close();
            _listener = null;
            _shutdown?.Dispose();
            _shutdown = null;
            _listenTask = null;
        }

        private async Task ListenLoop(HttpListener listener, CancellationToken cancellationToken)
        {
            while (listener.IsListening && !cancellationToken.IsCancellationRequested)
            {
                HttpListenerContext context;
                try
                {
                    context = await listener.GetContextAsync();
                }
                catch (HttpListenerException)
                {
                    break;
                }
                catch (ObjectDisposedException)
                {
                    break;
                }

                if (!context.Request.IsWebSocketRequest)
                {
                    context.Response.StatusCode = 400;
                    context.Response.Close();
                    continue;
                }

                if (!string.IsNullOrEmpty(context.Request.Headers["Origin"]) || !IsAuthorized(context.Request))
                {
                    context.Response.StatusCode = 403;
                    context.Response.Close();
                    continue;
                }

                var socketContext = await context.AcceptWebSocketAsync(WebSocketProtocol);
                _ = HandleSocket(socketContext.WebSocket, cancellationToken);
            }
        }

        private async Task HandleSocket(WebSocket socket, CancellationToken cancellationToken)
        {
            try
            {
                while (socket.State == WebSocketState.Open)
                {
                    var json = await ReceiveText(socket, cancellationToken);
                    if (json == null) break;

                    var response = Execute(json);
                    var bytes = Encoding.UTF8.GetBytes(response);
                    await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, cancellationToken);
                }
            }
            catch (Exception exception)
            {
                Console.Error.WriteLine("WebSocket error: " + exception);
                socket.Abort();
            }
        }

        private string Execute(string json)
        {
            string requestId = null;

            try
            {
                var request = JsonSerializer.Deserialize<EtabsRpcRequest>(json, JsonOptions);
                requestId = request?.Id;

                if (request == null || request.ProtocolVersion != ProtocolVersion)
                {
                    throw new InvalidOperationException("Unsupported ETABS bridge protocol version.");
                }

                var result = _invoker.Invoke(request);
                return JsonSerializer.Serialize(new
                {
                    id = requestId,
                    ok = true,
                    data = BuildData(result)
                }, JsonOptions);
            }
            catch (EtabsApiException ex)
            {
                return JsonSerializer.Serialize(new
                {
                    id = requestId,
                    ok = false,
                    error = new
                    {
                        type = "EtabsApiError",
                        api = ex.Api,
                        method = ex.Method,
                        code = ex.ReturnCode,
                        message = ex.Message
                    }
                }, JsonOptions);
            }
            catch (Exception ex)
            {
                return JsonSerializer.Serialize(new
                {
                    id = requestId,
                    ok = false,
                    error = new
                    {
                        type = ex.GetType().Name,
                        message = ex.Message
                    }
                }, JsonOptions);
            }
        }

        private static object BuildData(EtabsInvocationResult result)
        {
            if (result.ReturnValue == null)
            {
                return result.Outputs.Count == 0 ? null : (object)result.Outputs;
            }

            if (result.Outputs.Count == 0)
            {
                return result.ReturnValue;
            }

            var data = new System.Collections.Generic.Dictionary<string, object>(result.Outputs)
            {
                ["returnValue"] = result.ReturnValue
            };
            return data;
        }

        private bool IsAuthorized(HttpListenerRequest request)
        {
            var protocols = (request.Headers["Sec-WebSocket-Protocol"] ?? string.Empty).Split(',');
            var hasProtocol = false;
            var hasToken = false;

            foreach (var protocol in protocols)
            {
                var value = protocol.Trim();
                hasProtocol |= string.Equals(value, WebSocketProtocol, StringComparison.Ordinal);
                hasToken |= FixedTimeEquals(value, _authProtocol);
            }

            return hasProtocol && hasToken;
        }

        private static bool FixedTimeEquals(string left, string right)
        {
            var leftBytes = Encoding.UTF8.GetBytes(left ?? string.Empty);
            var rightBytes = Encoding.UTF8.GetBytes(right ?? string.Empty);
            var difference = leftBytes.Length ^ rightBytes.Length;
            var length = Math.Max(leftBytes.Length, rightBytes.Length);

            for (var i = 0; i < length; i++)
            {
                var leftByte = leftBytes.Length == 0 ? 0 : leftBytes[i % leftBytes.Length];
                var rightByte = rightBytes.Length == 0 ? 0 : rightBytes[i % rightBytes.Length];
                difference |= leftByte ^ rightByte;
            }

            return difference == 0;
        }

        private static async Task<string> ReceiveText(WebSocket socket, CancellationToken cancellationToken)
        {
            var buffer = new byte[8192];

            using (var stream = new MemoryStream())
            {
                while (true)
                {
                    var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationToken);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, cancellationToken);
                        return null;
                    }

                    if (result.MessageType != WebSocketMessageType.Text)
                    {
                        throw new InvalidDataException("Only text WebSocket messages are supported.");
                    }

                    stream.Write(buffer, 0, result.Count);
                    if (stream.Length > MaxRequestBytes)
                    {
                        throw new InvalidDataException("ETABS bridge request exceeds the 16 MiB limit.");
                    }
                    if (result.EndOfMessage)
                    {
                        return Encoding.UTF8.GetString(stream.ToArray());
                    }
                }
            }
        }
    }
}
