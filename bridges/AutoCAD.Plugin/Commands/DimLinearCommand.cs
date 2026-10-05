using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class DimLinearCommand : EntityCommandBase
    {
        private readonly Point3d _p1;
        private readonly Point3d _p2;
        private readonly Point3d _dimLinePoint;
        private readonly string _styleName;

        public DimLinearCommand(Point3d p1, Point3d p2, Point3d dimLinePoint, string styleName, string layer)
            : base(layer)
        {
            _p1 = p1;
            _p2 = p2;
            _dimLinePoint = dimLinePoint;
            _styleName = styleName;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
        {
            ObjectId styleId = context.Database.Dimstyle; // por defecto

            if (!string.IsNullOrEmpty(_styleName))
            {
                var dst = (DimStyleTable)context.Transaction.GetObject(context.Database.DimStyleTableId, OpenMode.ForRead);
                if (dst.Has(_styleName))
                {
                    styleId = dst[_styleName];
                }
            }

            return new AlignedDimension(_p1, _p2, _dimLinePoint, "", styleId);
        }
    }
}