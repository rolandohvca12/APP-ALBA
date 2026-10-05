using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class LineCommand : EntityCommandBase
    {
        private readonly Point3d _p1;
        private readonly Point3d _p2;

        public LineCommand(Point3d p1, Point3d p2, string layer) : base(layer)
        {
            _p1 = p1;
            _p2 = p2;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
            => new Line(_p1, _p2);
    }
}