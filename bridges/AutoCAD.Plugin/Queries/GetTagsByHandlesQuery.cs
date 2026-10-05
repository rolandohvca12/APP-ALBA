using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    /// <summary>
    /// Devuelve, para cada handle solicitado, el valor de tag asignado
    /// con TAGENTITY (leído desde XData bajo AppName
    /// "AUTOCADREALTIMEBRIDGE", mismo mecanismo que usa
    /// GetGeometryByTagQuery para filtrar). No recorre todo el dibujo:
    /// resuelve cada handle directamente a su ObjectId.
    /// </summary>
    public class GetTagsByHandlesQuery : ICadQuery
    {
        private readonly List<string> _handles;
        private const string AppName = "AUTOCADREALTIMEBRIDGE";

        public GetTagsByHandlesQuery(List<string> handles)
        {
            _handles = handles;
        }

        public object Execute(CadQueryContext context)
        {
            var result = new Dictionary<string, string>();

            foreach (var handleStr in _handles)
            {
                var handle = new Handle(System.Convert.ToInt64(handleStr, 16));

                ObjectId id;
                if (!context.Database.TryGetObjectId(handle, out id))
                {
                    result[handleStr] = null;
                    continue;
                }

                var ent = (Entity)context.Transaction.GetObject(id, OpenMode.ForRead);
                var rb = ent.GetXDataForApplication(AppName);

                if (rb == null)
                {
                    result[handleStr] = null;
                    continue;
                }

                var values = rb.AsArray();
                result[handleStr] = values.Length >= 2 ? values[1].Value.ToString() : null;
            }

            return result;
        }
    }
}