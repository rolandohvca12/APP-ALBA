using System;
using System.Collections.Generic;
using System.Text.Json;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public class CadQueryFactory
    {
        private readonly Dictionary<string, Func<JsonElement, ICadQuery>> _builders
            = new Dictionary<string, Func<JsonElement, ICadQuery>>();

        public CadQueryFactory()
        {
            Register("getLayers", _ => new GetLayersQuery());
            Register("getBlocks", _ => new GetBlocksQuery());
            Register("getEntitiesByLayer", q => new GetEntitiesByLayerQuery(q.GetProperty("layer").GetString()));
            Register("getGeometryByLayer", q => new GetGeometryByLayerQuery(q.GetProperty("layer").GetString()));

            Register("getGeometryByTag", q =>
            {
                var tag = q.GetProperty("tag").GetString();
                return new GetGeometryByTagQuery(tag);
            });

            Register("getTagsByHandles", q =>
            {
                var handles = new List<string>();
                foreach (var h in q.GetProperty("handles").EnumerateArray())
                    handles.Add(h.GetString());
                return new GetTagsByHandlesQuery(handles);
            });
        }

        public void Register(string type, Func<JsonElement, ICadQuery> builder) => _builders[type] = builder;

        public ICadQuery Create(JsonElement query)
        {
            var type = query.GetProperty("type").GetString();
            if (!_builders.TryGetValue(type, out var builder))
                throw new InvalidOperationException($"Query desconocida: {type}");
            return builder(query);
        }
    }
}