using System.Collections.Generic;
using System.Text.Json;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsRpcRequest
    {
        public int ProtocolVersion { get; set; }
        public string Id { get; set; }
        public string Api { get; set; }
        public string Method { get; set; }
        public Dictionary<string, JsonElement> Parameters { get; set; }
    }
}
