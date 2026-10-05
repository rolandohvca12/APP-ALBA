using Autodesk.AutoCAD.DatabaseServices;
using System;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    public class TagEntityCommand : ICadCommand
    {
        private readonly string _handleHex;
        private readonly string _tag;

        public TagEntityCommand(string handleHex, string tag)
        {
            _handleHex = handleHex;
            _tag = tag;
        }

        public void Execute(CadExecutionContext context)
        {
            var handle = new Handle(Convert.ToInt64(_handleHex, 16));
            var id = context.Database.GetObjectId(false, handle, 0);
            var entity = (Entity)context.Transaction.GetObject(id, OpenMode.ForWrite);

            EntityTaggingHelper.TagEntity(context.Transaction, context.Database, context.CurrentSpace, entity, _tag);
        }
    }
}