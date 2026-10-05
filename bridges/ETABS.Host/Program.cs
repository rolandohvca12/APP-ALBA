using System;
using System.Net;
using System.Runtime.InteropServices;
using System.Threading;
using EtabsRealtimeBridge.ETABS;

namespace EtabsRealtimeBridge.Host
{
    internal static class Program
    {
        private const string DefaultPrefix = "http://localhost:5006/";
        private static readonly ManualResetEvent Shutdown = new ManualResetEvent(false);

        [STAThread]
        private static int Main(string[] args)
        {
            var authToken = GetOption(args, "--token=") ?? Environment.GetEnvironmentVariable("ETABS_BRIDGE_TOKEN");
            if (string.IsNullOrWhiteSpace(authToken))
            {
                Console.Error.WriteLine("Missing --token=<token> or ETABS_BRIDGE_TOKEN.");
                return 4;
            }

            var prefix = GetPrefix(args);
            var attachOnly = HasArgument(args, "--attach-only");
            EtabsBridgeServer server = null;

            try
            {
                var etabsApiPath = GetOption(args, "--etabs-api-dll=");
                var resolvedEtabsApi = EtabsAssemblyResolver.Register(etabsApiPath);
                Console.WriteLine("Connecting to ETABS...");
                using (var dispatcher = EtabsStaDispatcher.Attach(!attachOnly))
                {
                    server = new EtabsBridgeServer(dispatcher, authToken, prefix);
                    server.Start();

                    Console.CancelKeyPress += OnCancelKeyPress;
                    Console.WriteLine(dispatcher.StartedEtabs
                        ? "ETABS started and bridge connected."
                        : "ETABS bridge connected.");
                    Console.WriteLine("WebSocket: " + ToWebSocketUrl(prefix));
                    Console.WriteLine("ETABS API: " + resolvedEtabsApi);
                    Console.WriteLine("Press Ctrl+C to stop.");

                    Shutdown.WaitOne();
                    return 0;
                }
            }
            catch (HttpListenerException exception) when (exception.ErrorCode == 5)
            {
                Console.Error.WriteLine("Windows denied access to " + prefix);
                Console.Error.WriteLine("Run this host as administrator or reserve the URL with:");
                Console.Error.WriteLine("netsh http add urlacl url=" + prefix + " user=\"" + Environment.UserDomainName + "\\" + Environment.UserName + "\"");
                return 2;
            }
            catch (COMException exception)
            {
                Console.Error.WriteLine("Could not attach to ETABS: " + exception.Message);
                Console.Error.WriteLine("Open ETABS first and run ETABS and this host with the same elevation level.");
                return 3;
            }
            catch (InvalidOperationException exception)
            {
                Console.Error.WriteLine("Could not attach to ETABS: " + exception.Message);
                Console.Error.WriteLine("Open ETABS first and run ETABS and this host with the same elevation level.");
                return 3;
            }
            catch (Exception exception)
            {
                Console.Error.WriteLine(exception.ToString());
                return 1;
            }
            finally
            {
                server?.Stop();
            }
        }

        private static string GetPrefix(string[] args)
        {
            var prefix = DefaultPrefix;
            foreach (var argument in args)
            {
                if (!argument.StartsWith("--", StringComparison.Ordinal))
                {
                    prefix = argument;
                    break;
                }
            }

            if (!prefix.EndsWith("/", StringComparison.Ordinal))
            {
                prefix += "/";
            }

            return prefix;
        }

        private static bool HasArgument(string[] args, string expected)
        {
            foreach (var argument in args)
            {
                if (string.Equals(argument, expected, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }

            return false;
        }

        private static string GetOption(string[] args, string prefix)
        {
            foreach (var argument in args)
            {
                if (argument.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                {
                    return argument.Substring(prefix.Length);
                }
            }

            return null;
        }

        private static string ToWebSocketUrl(string prefix)
        {
            if (prefix.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                return "wss://" + prefix.Substring("https://".Length).TrimEnd('/');
            }

            return "ws://" + prefix.Substring("http://".Length).TrimEnd('/');
        }

        private static void OnCancelKeyPress(object sender, ConsoleCancelEventArgs args)
        {
            args.Cancel = true;
            Shutdown.Set();
        }
    }
}
