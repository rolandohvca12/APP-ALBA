using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Borra todas las entidades del espacio actual (Model Space).
    /// No borra definiciones de bloque ni capas, solo lo dibujado.
    /// </summary>
    public class ClearModelCommand : ICadCommand
    {
        public void Execute(CadExecutionContext context)
        {
            foreach (ObjectId id in context.CurrentSpace)
            {
                var ent = (Entity)context.Transaction.GetObject(id, OpenMode.ForWrite);
                ent.Erase();
            }
        }
    }
}