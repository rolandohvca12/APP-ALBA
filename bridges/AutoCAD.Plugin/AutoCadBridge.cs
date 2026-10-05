using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Runtime;
using AutoCadRealtimeBridge.Plugin.Commands;
using AutoCadRealtimeBridge.Plugin.Queries;
using AutoCadRealtimeBridge.Plugin.Documents;

namespace AutoCadRealtimeBridge.Plugin
{
    public class AutoCadBridge
    {
        private readonly CadCommandFactory _commandFactory = new CadCommandFactory();
        private readonly CadQueryFactory _queryFactory = new CadQueryFactory();
        private readonly CadDocumentCommandFactory _documentFactory = new CadDocumentCommandFactory();
        private static HttpListener _listener;

        [CommandMethod("STARTBRIDGE")]
        public void StartBridge()
        {
            if (_listener != null && _listener.IsListening)
            {
                var document = Application.DocumentManager.MdiActiveDocument;
                document.Editor.WriteMessage("\nBridge ya está escuchando en ws://localhost:5005");
                return;
            }

            _listener = new HttpListener();
            _listener.Prefixes.Add("http://localhost:5005/");
            _listener.Start();

            var doc = Application.DocumentManager.MdiActiveDocument;
            doc.Editor.WriteMessage("\nBridge escuchando en ws://localhost:5005");

            ListenLoop(_listener);
        }

        [CommandMethod("STOPBRIDGE")]
        public void StopBridge()
        {
            if (_listener == null)
                return;

            if (_listener.IsListening)
                _listener.Stop();

            _listener.Close();
            _listener = null;

            var document = Application.DocumentManager.MdiActiveDocument;
            document.Editor.WriteMessage("\nBridge detenido.");
        }

        private async void ListenLoop(HttpListener listener)
        {
            while (true)
            {
                var ctx = await listener.GetContextAsync();
                if (!ctx.Request.IsWebSocketRequest)
                {
                    ctx.Response.StatusCode = 400;
                    ctx.Response.Close();
                    continue;
                }
                var wsCtx = await ctx.AcceptWebSocketAsync(null);
                _ = HandleSocket(wsCtx.WebSocket);
            }
        }

        private async Task HandleSocket(WebSocket socket)
        {
            var buffer = new byte[4096];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new System.ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close) break;

                var json = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var message = JsonSerializer.Deserialize<JsonElement>(json);
                var response = Execute(message);
                var respBytes = Encoding.UTF8.GetBytes(response);
                await socket.SendAsync(new System.ArraySegment<byte>(respBytes), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }

        /// <summary>
        /// Dispatcher de 3 vías, según "kind" en el mensaje:
        ///   - "command" (o ausente, retrocompatible): modifica el dibujo activo (dentro de una Transaction).
        ///   - "query": solo lectura (dentro de una Transaction de solo lectura).
        ///   - "document": gestión de archivo (new/open/save/close), SIN Transaction sobre el dibujo actual.
        /// </summary>
        private string Execute(JsonElement message)
        {
            var requestId = message.TryGetProperty("id", out var id) ? id.GetString(): null;
            var kind = message.TryGetProperty("kind", out var k) ? k.GetString(): "command";
            try
            {
                if (kind == "document")
                {
                    var docCommand = _documentFactory.Create(message);
                    var data = docCommand.Execute();
                    return JsonSerializer.Serialize(new
                    {
                        id = requestId,
                        ok = true,
                        data
                    });
                }

                var doc = Application.DocumentManager.MdiActiveDocument;
                var db = doc.Database;

                if (kind == "query")
                {
                    using (doc.LockDocument())
                    using (var tr = db.TransactionManager.StartTransaction())
                    {
                        var query = _queryFactory.Create(message);
                        var context = new CadQueryContext(tr, db);
                        var data = query.Execute(context);
                        tr.Commit();
                        return JsonSerializer.Serialize(new
                        {
                            id = requestId,
                            ok = true,
                            data
                        });
                    }
                }

                // kind == "command" (default)
                ICadCommand command = _commandFactory.Create(message);
                string createdHandle = null;
                using (doc.LockDocument())
                using (var tr = db.TransactionManager.StartTransaction())
                {
                    var btr = (BlockTableRecord)tr.GetObject(db.CurrentSpaceId, OpenMode.ForWrite);
                    var context = new CadExecutionContext(tr, btr, db);
                    command.Execute(context);
                    createdHandle = context.LastCreatedHandle;
                    tr.Commit();
                }
                return JsonSerializer.Serialize(new
                {
                    id = requestId,
                    ok = true,
                    handle = createdHandle
                });
            }
            catch (System.Exception ex)
            {
                return JsonSerializer.Serialize(new
                {
                    id = requestId,
                    ok = false,
                    error = ex.Message
                });
            }
        }
    }
}