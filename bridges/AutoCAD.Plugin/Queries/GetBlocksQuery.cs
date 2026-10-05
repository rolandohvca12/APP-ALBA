using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public class GetBlocksQuery : ICadQuery
    {
        public object Execute(CadQueryContext context)
        {
            var result = new List<string>();
            var bt = (BlockTable)context.Transaction.GetObject(context.Database.BlockTableId, OpenMode.ForRead);

            foreach (ObjectId id in bt)
            {
                var btr = (BlockTableRecord)context.Transaction.GetObject(id, OpenMode.ForRead);
                if (!btr.IsLayout && !btr.IsAnonymous) result.Add(btr.Name);
            }

            return result;
        }
    }
}