using AutoCadRealtimeBridge.Plugin.Queries;
using Autodesk.AutoCAD.DatabaseServices;
using System.Collections.Generic;

public class GetGeometryByTagQuery : ICadQuery
{
    private readonly string _tag;
    private const string AppName = "AUTOCADREALTIMEBRIDGE";

    public GetGeometryByTagQuery(string tag) { _tag = tag; }

    public object Execute(CadQueryContext context)
    {
        var result = new List<object>();
        var btr = (BlockTableRecord)context.Transaction.GetObject(context.Database.CurrentSpaceId, OpenMode.ForRead);

        foreach (ObjectId id in btr)
        {
            var ent = (Entity)context.Transaction.GetObject(id, OpenMode.ForRead);
            var rb = ent.GetXDataForApplication(AppName);
            if (rb == null) continue;

            var values = rb.AsArray();
            if (values.Length < 2 || values[1].Value.ToString() != _tag) continue;

            result.Add(ExtractGeometry(ent));
        }
        return result;
    }

    private object ExtractGeometry(Entity ent)
    {
        if (ent is Line line)
        {
            return new
            {
                handle = ent.Handle.ToString(),
                type = "Line",
                points = new[] {
                    new { x = line.StartPoint.X, y = line.StartPoint.Y, z = line.StartPoint.Z },
                    new { x = line.EndPoint.X, y = line.EndPoint.Y, z = line.EndPoint.Z }
                },
                length = line.Length,
                closed = false,
                area = 0.0
            };
        }
        if (ent is Polyline pl)
        {
            var points = new List<object>();
            for (int i = 0; i < pl.NumberOfVertices; i++)
            {
                var pt = pl.GetPoint3dAt(i);
                points.Add(new { x = pt.X, y = pt.Y, z = pt.Z });
            }
            return new
            {
                handle = ent.Handle.ToString(),
                type = "Polyline",
                points,
                length = pl.Length,
                closed = pl.Closed,
                area = pl.Closed ? pl.Area : 0.0
            };
        }
        return null;
    }
}