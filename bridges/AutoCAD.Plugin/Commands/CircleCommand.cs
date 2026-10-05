using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class CircleCommand : EntityCommandBase
    {
        private readonly Point3d _center;
        private readonly double _radius;

        public CircleCommand(Point3d center, double radius, string layer) : base(layer)
        {
            _center = center;
            _radius = radius;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
            => new Circle(_center, Vector3d.ZAxis, _radius);
    }
}