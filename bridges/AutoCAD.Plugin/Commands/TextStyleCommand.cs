using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Única responsabilidad: registrar un TextStyle nombrado (fuente,
    /// altura por defecto, factor de ancho) en la TextStyleTable, para que
    /// TextCommand pueda referenciarlo por nombre.
    /// </summary>
    public class DefineTextStyleCommand : ICadCommand
    {
        private readonly string _name;
        private readonly string _fontFile;
        private readonly double _widthFactor;

        public DefineTextStyleCommand(string name, string fontFile, double widthFactor)
        {
            _name = name;
            _fontFile = string.IsNullOrEmpty(fontFile) ? "romans.shx" : fontFile;
            _widthFactor = widthFactor <= 0 ? 1.0 : widthFactor;
        }

        public void Execute(CadExecutionContext context)
        {
            var tst = (TextStyleTable)context.Transaction.GetObject(context.Database.TextStyleTableId, OpenMode.ForWrite);
            if (tst.Has(_name)) return;

            var record = new TextStyleTableRecord
            {
                Name = _name,
                FileName = _fontFile,
                XScale = _widthFactor
            };
            tst.Add(record);
            context.Transaction.AddNewlyCreatedDBObject(record, true);
        }
    }
}