using System.Collections.Generic;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsInvocationResult
    {
        public object ReturnValue { get; set; }
        public Dictionary<string, object> Outputs { get; } = new Dictionary<string, object>();
    }
}
