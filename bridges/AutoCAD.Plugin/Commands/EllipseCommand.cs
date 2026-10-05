using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class EllipseCommand : EntityCommandBase
    {
        private readonly Point3d _center;
        private readonly Vector3d _majorAxis;
        private readonly double _radiusRatio;

        public EllipseCommand(Point3d center, Vector3d majorAxis, double radiusRatio, string layer)
            : base(layer)
        {
            _center = center;
            _majorAxis = majorAxis;
            _radiusRatio = radiusRatio;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
            => new Ellipse(_center, Vector3d.ZAxis, _majorAxis, _radiusRatio, 0, 2 * System.Math.PI);
    }
}