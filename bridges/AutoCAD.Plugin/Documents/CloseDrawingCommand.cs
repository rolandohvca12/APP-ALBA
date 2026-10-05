using Autodesk.AutoCAD.ApplicationServices;

namespace AutoCadRealtimeBridge.Plugin.Documents
{
    public class CloseDrawingCommand : ICadDocumentCommand
    {
        private readonly bool _saveChanges;

        public CloseDrawingCommand(bool saveChanges)
        {
            _saveChanges = saveChanges;
        }

        public object Execute()
        {
            var doc = Application.DocumentManager.MdiActiveDocument;
            var name = doc.Name;

            if (_saveChanges)
            {
                doc.Database.SaveAs(doc.Database.Filename, Autodesk.AutoCAD.DatabaseServices.DwgVersion.Current);
            }

            doc.CloseAndDiscard();
            return new { closed = name };
        }
    }
}