using Autodesk.AutoCAD.Colors;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class CreateLayerCommand : ICadCommand
    {
        private readonly string _name;
        private readonly short _colorIndex;

        public CreateLayerCommand(string name, short colorIndex)
        {
            _name = name;
            _colorIndex = colorIndex;
        }

        public void Execute(CadExecutionContext context)
        {
            var lt = (LayerTable)context.Transaction.GetObject(context.Database.LayerTableId, OpenMode.ForWrite);
            if (lt.Has(_name)) return;

            var ltr = new LayerTableRecord
            {
                Name = _name,
                Color = Color.FromColorIndex(ColorMethod.ByAci, _colorIndex)
            };
            lt.Add(ltr);
            context.Transaction.AddNewlyCreatedDBObject(ltr, true);
        }
    }
}