using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Rayado (Hatch) sobre un contorno cerrado. El patrón por defecto es
    /// "ANSI31" (rayado diagonal, típico de secciones de concreto/acero).
    /// </summary>
    public class HatchCommand : ICadCommand
    {
        private readonly IReadOnlyList<Point3d> _boundary;
        private readonly string _patternName;
        private readonly double _scale;
        private readonly string _layer;

        public HatchCommand(IReadOnlyList<Point3d> boundary, string patternName, double scale, string layer)
        {
            _boundary = boundary;
            _patternName = string.IsNullOrEmpty(patternName) ? "ANSI31" : patternName;
            _scale = scale <= 0 ? 1.0 : scale;
            _layer = layer;
        }

        public void Execute(CadExecutionContext context)
        {
            // 1) Crear la polilínea del contorno (no se agrega visible; se usa como boundary)
            var pl = new Polyline();
            for (int i = 0; i < _boundary.Count; i++)
            {
                pl.AddVertexAt(i, new Point2d(_boundary[i].X, _boundary[i].Y), 0, 0, 0);
            }
            pl.Closed = true;

            context.CurrentSpace.AppendEntity(pl);
            context.Transaction.AddNewlyCreatedDBObject(pl, true);

            // 2) Crear el Hatch asociado a esa polilínea
            var hatch = new Hatch();
            context.CurrentSpace.AppendEntity(hatch);
            context.Transaction.AddNewlyCreatedDBObject(hatch, true);

            hatch.SetHatchPattern(HatchPatternType.PreDefined, _patternName);
            hatch.PatternScale = _scale;

            var loop = new ObjectIdCollection { pl.ObjectId };
            hatch.AppendLoop(HatchLoopTypes.Default, loop);
            hatch.EvaluateHatch(true);

            if (!string.IsNullOrEmpty(_layer))
            {
                hatch.Layer = _layer;
                pl.Layer = _layer;
            }
        }
    }
}