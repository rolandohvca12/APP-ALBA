using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class RectangleCommand : EntityCommandBase
    {
        private readonly Point3d _p1;
        private readonly Point3d _p2;

        public RectangleCommand(Point3d p1, Point3d p2, string layer) : base(layer)
        {
            _p1 = p1;
            _p2 = p2;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
        {
            var pl = new Polyline();
            pl.AddVertexAt(0, new Point2d(_p1.X, _p1.Y), 0, 0, 0);
            pl.AddVertexAt(1, new Point2d(_p2.X, _p1.Y), 0, 0, 0);
            pl.AddVertexAt(2, new Point2d(_p2.X, _p2.Y), 0, 0, 0);
            pl.AddVertexAt(3, new Point2d(_p1.X, _p2.Y), 0, 0, 0);
            pl.Closed = true;
            return pl;
        }
    }
}