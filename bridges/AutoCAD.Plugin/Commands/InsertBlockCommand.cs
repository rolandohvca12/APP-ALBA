using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class InsertBlockCommand : EntityCommandBase
    {
        private readonly string _blockName;
        private readonly Point3d _position;
        private readonly double _scale;
        private readonly double _rotationRad;

        public InsertBlockCommand(string blockName, Point3d position, double scale, double rotationRad, string layer)
            : base(layer)
        {
            _blockName = blockName;
            _position = position;
            _scale = scale <= 0 ? 1.0 : scale;
            _rotationRad = rotationRad;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
        {
            var bt = (BlockTable)context.Transaction.GetObject(context.Database.BlockTableId, OpenMode.ForRead);

            if (!bt.Has(_blockName))
            {
                throw new System.Exception($"Bloque no definido: '{_blockName}'. Usa 'defineBlock' primero.");
            }

            var blockId = bt[_blockName];
            var blockRef = new BlockReference(_position, blockId)
            {
                ScaleFactors = new Scale3d(_scale, _scale, _scale),
                Rotation = _rotationRad
            };
            return blockRef;
        }
    }
}