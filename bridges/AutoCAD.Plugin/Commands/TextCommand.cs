using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class TextCommand : EntityCommandBase
    {
        private readonly Point3d _position;
        private readonly double _height;
        private readonly string _content;
        private readonly string _styleName;
        private readonly double _rotationRad;

        public TextCommand(Point3d position, double height, string content, string styleName, double rotationRad, string layer)
            : base(layer)
        {
            _position = position;
            _height = height;
            _content = content;
            _styleName = styleName;
            _rotationRad = rotationRad;
        }

        protected override Entity CreateEntity(CadExecutionContext context)
        {
            var text = new DBText
            {
                Position = _position,
                Height = _height,
                TextString = _content,
                Rotation = _rotationRad
            };

            if (!string.IsNullOrEmpty(_styleName))
            {
                var tst = (TextStyleTable)context.Transaction.GetObject(context.Database.TextStyleTableId, OpenMode.ForRead);
                if (tst.Has(_styleName))
                {
                    text.TextStyleId = tst[_styleName];
                }
            }

            return text;
        }
    }
}