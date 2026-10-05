using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    /// <summary>
    /// Devuelve, para cada entidad de la capa indicada, su tipo y su
    /// geometría cruda (puntos). No calcula centroides, longitudes ni
    /// espesores — eso es responsabilidad del lado TS.
    /// </summary>
    public class GetGeometryByLayerQuery : ICadQuery
    {
        private readonly string _layer;

        public GetGeometryByLayerQuery(string layer)
        {
            _layer = layer;
        }

        public object Execute(CadQueryContext context)
        {
            var result = new List<object>();
            var btr = (BlockTableRecord)context.Transaction.GetObject(context.Database.CurrentSpaceId, OpenMode.ForRead);

            foreach (ObjectId id in btr)
            {
                var ent = (Entity)context.Transaction.GetObject(id, OpenMode.ForRead);
                if (ent.Layer != _layer) continue;

                if (ent is Line line)
                {
                    result.Add(new
                    {
                        handle = ent.Handle.ToString(),
                        type = "Line",
                        points = new[]
                        {
                            new { x = line.StartPoint.X, y = line.StartPoint.Y, z = line.StartPoint.Z },
                            new { x = line.EndPoint.X, y = line.EndPoint.Y, z = line.EndPoint.Z }
                        },
                        length = line.Length,
                        closed = false,
                        area = 0.0
                    });
                }
                else if (ent is Polyline pl)
                {
                    var points = new List<object>();
                    for (int i = 0; i < pl.NumberOfVertices; i++)
                    {
                        var pt = pl.GetPoint3dAt(i);
                        points.Add(new { x = pt.X, y = pt.Y, z = pt.Z });
                    }

                    result.Add(new
                    {
                        handle = ent.Handle.ToString(),
                        type = "Polyline",
                        points,
                        length = pl.Length,
                        closed = pl.Closed,
                        area = pl.Closed ? pl.Area : 0.0
                    });
                }
            }

            return result;
        }
    }
}