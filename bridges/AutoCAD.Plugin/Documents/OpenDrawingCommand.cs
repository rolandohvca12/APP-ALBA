using Autodesk.AutoCAD.ApplicationServices;

namespace AutoCadRealtimeBridge.Plugin.Documents
{
    public class OpenDrawingCommand : ICadDocumentCommand
    {
        private readonly string _path;

        public OpenDrawingCommand(string path)
        {
            _path = path;
        }

        public object Execute()
        {
            var docs = Application.DocumentManager;
            var doc = docs.Open(_path, false); // false = no read-only
            docs.MdiActiveDocument = doc;
            return new { fileName = doc.Name };
        }
    }
}