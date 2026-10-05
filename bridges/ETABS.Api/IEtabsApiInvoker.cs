namespace EtabsRealtimeBridge.ETABS
{
    public interface IEtabsApiInvoker
    {
        EtabsInvocationResult Invoke(EtabsRpcRequest request);
    }
}
