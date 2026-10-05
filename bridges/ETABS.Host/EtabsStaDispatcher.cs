using System;
using System.Runtime.ExceptionServices;
using System.Threading;
using System.Windows.Forms;
using EtabsRealtimeBridge.ETABS;

namespace EtabsRealtimeBridge.Host
{
    internal sealed class EtabsStaDispatcher : IEtabsApiInvoker, IDisposable
    {
        private readonly ManualResetEventSlim _initialized = new ManualResetEventSlim(false);
        private readonly Thread _thread;
        private readonly bool _startIfMissing;
        private ExceptionDispatchInfo _initializationError;
        private Control _dispatcherControl;
        private EtabsApiInvoker _invoker;
        private bool _disposed;

        private EtabsStaDispatcher(bool startIfMissing)
        {
            _startIfMissing = startIfMissing;
            _thread = new Thread(Run)
            {
                IsBackground = true,
                Name = "ETABS API STA"
            };
            _thread.SetApartmentState(ApartmentState.STA);
            _thread.Start();
        }

        public bool StartedEtabs { get; private set; }

        public static EtabsStaDispatcher Attach(bool startIfMissing = true)
        {
            var dispatcher = new EtabsStaDispatcher(startIfMissing);
            dispatcher._initialized.Wait();

            if (dispatcher._initializationError != null)
            {
                dispatcher.Dispose();
                dispatcher._initializationError.Throw();
            }

            return dispatcher;
        }

        public EtabsInvocationResult Invoke(EtabsRpcRequest request)
        {
            if (_disposed) throw new ObjectDisposedException(nameof(EtabsStaDispatcher));

            var invocation = new Invocation(request);
            _dispatcherControl.BeginInvoke(new Action(() => Execute(invocation)));
            invocation.Completed.Wait();
            invocation.Error?.Throw();
            return invocation.Result;
        }

        public void Dispose()
        {
            if (_disposed) return;

            _disposed = true;
            if (_dispatcherControl != null && !_dispatcherControl.IsDisposed)
            {
                _dispatcherControl.BeginInvoke(new Action(Application.ExitThread));
            }

            if (_thread.IsAlive && Thread.CurrentThread != _thread)
            {
                _thread.Join();
            }

            _initialized.Dispose();
        }

        private void Run()
        {
            try
            {
                _invoker = new EtabsApiInvoker(OpenSession());
                _dispatcherControl = new Control();
                var handle = _dispatcherControl.Handle;
                _initialized.Set();
                Application.Run();
                _dispatcherControl.Dispose();
            }
            catch (Exception exception)
            {
                _initializationError = ExceptionDispatchInfo.Capture(exception);
                _initialized.Set();
            }
        }

        private void Execute(Invocation invocation)
        {
            try
            {
                invocation.Result = _invoker.Invoke(invocation.Request);
            }
            catch (Exception exception)
            {
                invocation.Error = ExceptionDispatchInfo.Capture(exception);
            }
            finally
            {
                invocation.Completed.Set();
            }
        }

        private EtabsSession OpenSession()
        {
            try
            {
                return EtabsSession.Attach();
            }
            catch (Exception exception) when (
                _startIfMissing &&
                (exception is InvalidOperationException || exception is System.Runtime.InteropServices.COMException))
            {
                var session = EtabsSession.CreateByProgramId();
                var returnCode = session.Oapi.ApplicationStart();
                if (returnCode != 0)
                {
                    throw new EtabsApiException("cOAPI", "ApplicationStart", returnCode);
                }

                StartedEtabs = true;
                return session;
            }
        }

        private sealed class Invocation
        {
            public Invocation(EtabsRpcRequest request)
            {
                Request = request;
            }

            public EtabsRpcRequest Request { get; }
            public ManualResetEventSlim Completed { get; } = new ManualResetEventSlim(false);
            public EtabsInvocationResult Result { get; set; }
            public ExceptionDispatchInfo Error { get; set; }
        }
    }
}
