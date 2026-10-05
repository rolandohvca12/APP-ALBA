using Autodesk.AutoCAD.Colors;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public static class EntityTaggingHelper
    {
        private const string AppName = "AUTOCADREALTIMEBRIDGE";
        private const string LabelLayer = "TAGS_DEBUG";

        public static void TagEntity(Transaction tr, Database db, BlockTableRecord currentSpace, Entity entity, string tag)
        {
            EnsureRegApp(tr, db);

            entity.XData = new ResultBuffer(
                new TypedValue((int)DxfCode.ExtendedDataRegAppName, AppName),
                new TypedValue((int)DxfCode.ExtendedDataAsciiString, tag)
            );

            EnsureLayer(tr, db, LabelLayer);

            var b = entity.GeometricExtents;
            var center = new Point3d(
                (b.MinPoint.X + b.MaxPoint.X) / 2,
                (b.MinPoint.Y + b.MaxPoint.Y) / 2,
                (b.MinPoint.Z + b.MaxPoint.Z) / 2);

            var text = new DBText
            {
                Position = center,
                Height = 0.15,
                TextString = tag,
                Layer = LabelLayer,
                HorizontalMode = TextHorizontalMode.TextCenter,
                VerticalMode = TextVerticalMode.TextVerticalMid
            };

            text.AlignmentPoint = center;

            currentSpace.AppendEntity(text);
            tr.AddNewlyCreatedDBObject(text, true);
            text.AdjustAlignment(db); // fix: requerido para justificación no Left/Base
        }

        private static void EnsureLayer(Transaction tr, Database db, string name)
        {
            var table = (LayerTable)tr.GetObject(db.LayerTableId, OpenMode.ForRead);
            if (table.Has(name)) return;

            table.UpgradeOpen();
            var layer = new LayerTableRecord { Name = name, Color = Color.FromColorIndex(ColorMethod.ByAci, 2) };
            table.Add(layer);
            tr.AddNewlyCreatedDBObject(layer, true);
        }

        private static void EnsureRegApp(Transaction tr, Database db)
        {
            var table = (RegAppTable)tr.GetObject(db.RegAppTableId, OpenMode.ForRead);
            if (table.Has(AppName)) return;

            table.UpgradeOpen();
            var record = new RegAppTableRecord { Name = AppName };
            table.Add(record);
            tr.AddNewlyCreatedDBObject(record, true);
        }
    }
}