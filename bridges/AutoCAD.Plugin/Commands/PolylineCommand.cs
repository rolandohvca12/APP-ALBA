using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class PolylineCommand : EntityCommandBase
    {
        private readonly IReadOnlyList<Point3d> _points;
        private readonly bool _closed;

        public PolylineCommand(IReadOnlyList<Point3d> points, bool closed, string layer) : base(layer)
        {
            _points = points;
            _closed = closed;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
        {
            var pl = new Polyline();
            for (int i = 0; i < _points.Count; i++)
            {
                pl.AddVertexAt(i, new Point2d(_points[i].X, _points[i].Y), 0, 0, 0);
            }
            pl.Closed = _closed;
            return pl;
        }
    }
}