using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class ArcCommand : EntityCommandBase
    {
        private readonly Point3d _center;
        private readonly double _radius;
        private readonly double _startAngleRad;
        private readonly double _endAngleRad;

        public ArcCommand(Point3d center, double radius, double startAngleRad, double endAngleRad, string layer)
            : base(layer)
        {
            _center = center;
            _radius = radius;
            _startAngleRad = startAngleRad;
            _endAngleRad = endAngleRad;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
            => new Arc(_center, _radius, _startAngleRad, _endAngleRad);
    }
}