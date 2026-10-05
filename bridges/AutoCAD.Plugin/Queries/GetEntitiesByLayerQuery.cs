using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public class GetEntitiesByLayerQuery : ICadQuery
    {
        private readonly string _layer;

        public GetEntitiesByLayerQuery(string layer)
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

                result.Add(new
                {
                    handle = ent.Handle.ToString(),
                    type = ent.GetType().Name,
                    layer = ent.Layer
                });
            }

            return result;
        }
    }
}