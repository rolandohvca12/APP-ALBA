using System;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsApiException : Exception
    {
        public string Api { get; }
        public string Method { get; }
        public int ReturnCode { get; }

        public EtabsApiException(string api, string method, int returnCode)
            : base($"ETABS API call failed: {api}.{method} returned {returnCode}.")
        {
            Api = api;
            Method = method;
            ReturnCode = returnCode;
        }
    }
}
