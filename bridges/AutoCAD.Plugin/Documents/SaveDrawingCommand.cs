using Autodesk.AutoCAD.ApplicationServices;

namespace AutoCadRealtimeBridge.Plugin.Documents
{
    /// <summary>
    /// Guarda el dibujo activo. Si se indica savePath, hace "guardar como";
    /// si no, guarda sobre el archivo actual.
    /// </summary>
    public class SaveDrawingCommand : ICadDocumentCommand
    {
        private readonly string _savePath;

        public SaveDrawingCommand(string savePath)
        {
            _savePath = savePath;
        }

        public object Execute()
        {
            var doc = Application.DocumentManager.MdiActiveDocument;

            if (string.IsNullOrEmpty(_savePath))
            {
                doc.Database.SaveAs(doc.Database.Filename, Autodesk.AutoCAD.DatabaseServices.DwgVersion.Current);
            }
            else
            {
                doc.Database.SaveAs(_savePath, Autodesk.AutoCAD.DatabaseServices.DwgVersion.Current);
            }

            return new { savedTo = _savePath ?? doc.Database.Filename };
        }
    }
}