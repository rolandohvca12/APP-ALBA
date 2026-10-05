using System.Collections.Generic;
using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Define un bloque nuevo en la BlockTable a partir de una lista de
    /// sub-comandos (reutiliza ICadCommand: la geometría interna del bloque
    /// se construye con los mismos comandos que ya existen).
    /// No inserta nada visible en el dibujo — solo registra la definición.
    /// </summary>
    public class DefineBlockCommand : ICadCommand
    {
        private readonly string _name;
        private readonly IReadOnlyList<ICadCommand> _geometryCommands;

        public DefineBlockCommand(string name, IReadOnlyList<ICadCommand> geometryCommands)
        {
            _name = name;
            _geometryCommands = geometryCommands;
        }

        public void Execute(CadExecutionContext context)
        {
            var bt = (BlockTable)context.Transaction.GetObject(context.Database.BlockTableId, OpenMode.ForWrite);

            if (bt.Has(_name)) return; // ya definido; no redefinir

            var btr = new BlockTableRecord { Name = _name };
            bt.Add(btr);
            context.Transaction.AddNewlyCreatedDBObject(btr, true);

            // La geometría del bloque se agrega DENTRO de btr, no en CurrentSpace.
            var blockContext = new CadExecutionContext(context.Transaction, btr, context.Database);
            foreach (var cmd in _geometryCommands)
            {
                cmd.Execute(blockContext);
            }
        }
    }
}