using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Única responsabilidad: registrar un DimStyle nombrado (precisión
    /// decimal, escala de texto, escala global de la cota) en la
    /// DimStyleTable, para que DimLinearCommand pueda referenciarlo.
    /// </summary>
    public class DefineDimStyleCommand : ICadCommand
    {
        private readonly string _name;
        private readonly int _decimalPlaces;
        private readonly double _textHeight;
        private readonly double _overallScale;

        public DefineDimStyleCommand(string name, int decimalPlaces, double textHeight, double overallScale)
        {
            _name = name;
            _decimalPlaces = decimalPlaces;
            _textHeight = textHeight <= 0 ? 0.18 : textHeight;
            _overallScale = overallScale <= 0 ? 1.0 : overallScale;
        }

        public void Execute(CadExecutionContext context)
        {
            var dst = (DimStyleTable)context.Transaction.GetObject(context.Database.DimStyleTableId, OpenMode.ForWrite);
            if (dst.Has(_name)) return;

            var record = new DimStyleTableRecord
            {
                Name = _name,
                Dimdec = _decimalPlaces,
                Dimtxt = _textHeight,
                Dimscale = _overallScale
            };
            dst.Add(record);
            context.Transaction.AddNewlyCreatedDBObject(record, true);
        }
    }
}