using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public class GetLayersQuery : ICadQuery
    {
        public object Execute(CadQueryContext context)
        {
            var result = new List<object>();
            var lt = (LayerTable)context.Transaction.GetObject(context.Database.LayerTableId, OpenMode.ForRead);

            foreach (ObjectId id in lt)
            {
                var ltr = (LayerTableRecord)context.Transaction.GetObject(id, OpenMode.ForRead);
                result.Add(new { name = ltr.Name, colorIndex = ltr.Color.ColorIndex, isOff = ltr.IsOff, isFrozen = ltr.IsFrozen });
            }

            return result;
        }
    }
}