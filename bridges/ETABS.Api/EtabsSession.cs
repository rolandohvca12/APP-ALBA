using System;
using ETABSv1;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsSession
    {
        public cOAPI Oapi { get; }
        public cSapModel SapModel => Oapi.SapModel;

        public EtabsSession(cOAPI oapi)
        {
            Oapi = oapi ?? throw new ArgumentNullException(nameof(oapi));
        }

        public static EtabsSession Attach(string typeName = "CSI.ETABS.API.ETABSObject")
        {
            cHelper helper = new Helper();
            var oapi = helper.GetObject(typeName);
            if (oapi == null)
            {
                throw new InvalidOperationException("ETABS did not expose a running API instance.");
            }

            return new EtabsSession(oapi);
        }

        public static EtabsSession CreateByProgramId(string progId = "CSI.ETABS.API.ETABSObject")
        {
            cHelper helper = new Helper();
            return new EtabsSession(helper.CreateObjectProgID(progId));
        }

        public static EtabsSession CreateByPath(string fullPath)
        {
            cHelper helper = new Helper();
            return new EtabsSession(helper.CreateObject(fullPath));
        }
    }
}
