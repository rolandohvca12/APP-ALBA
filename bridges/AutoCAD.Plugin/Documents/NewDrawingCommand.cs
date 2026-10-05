using Autodesk.AutoCAD.ApplicationServices;

namespace AutoCadRealtimeBridge.Plugin.Documents
{
    /// <summary>
    /// Crea un nuevo dibujo en blanco (usa la plantilla por defecto del
    /// usuario, o una ruta de plantilla específica si se indica).
    /// </summary>
    public class NewDrawingCommand : ICadDocumentCommand
    {
        private readonly string _templatePath;

        public NewDrawingCommand(string templatePath)
        {
            _templatePath = templatePath;
        }

        public object Execute()
        {
            var docs = Application.DocumentManager;
            var doc = string.IsNullOrEmpty(_templatePath)
                ? docs.Add(docs.MdiActiveDocument?.Database.OriginalFileName ?? "acad.dwt")
                : docs.Add(_templatePath);

            docs.MdiActiveDocument = doc;
            return new { fileName = doc.Name };
        }
    }
}