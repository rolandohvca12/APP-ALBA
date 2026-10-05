using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;

namespace AutoCadRealtimeBridge.Plugin
{
    public class TagSelectedEntityCommand
    {
        [CommandMethod("TAGENTITY")]
        public void TagEntity()
        {
            var doc = Application.DocumentManager.MdiActiveDocument;
            var ed = doc.Editor;

            var selResult = ed.GetEntity("\nSelecciona la entidad a etiquetar: ");
            if (selResult.Status != PromptStatus.OK) return;

            var tagResult = ed.GetString("\nEtiqueta: ");
            if (tagResult.Status != PromptStatus.OK) return;

            using (doc.LockDocument())
            using (var tr = doc.Database.TransactionManager.StartTransaction())
            {
                var entity = (Entity)tr.GetObject(selResult.ObjectId, OpenMode.ForWrite);
                var currentSpace = (BlockTableRecord)tr.GetObject(doc.Database.CurrentSpaceId, OpenMode.ForWrite);

                Commands.EntityTaggingHelper.TagEntity(tr, doc.Database, currentSpace, entity, tagResult.StringResult);

                tr.Commit();
                ed.WriteMessage($"\nEtiquetado como '{tagResult.StringResult}'.");
            }
        }
    }
}