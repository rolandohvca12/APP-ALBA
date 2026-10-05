using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Base para todo comando que crea una entidad gráfica. Fija el flujo
    /// común (crear -> asignar capa -> agregar al espacio actual) y delega
    /// en las subclases SOLO la construcción de la entidad concreta
    /// (CreateEntity). Esto es Template Method: el algoritmo vive aquí una
    /// sola vez, cada entidad nueva solo aporta su propio "cómo construirme".
    /// </summary>
    public abstract class EntityCommandBase : ICadCommand
    {
        /// <summary>Capa destino; null = capa activa del dibujo.</summary>
        protected string Layer { get; }

        protected EntityCommandBase(string layer)
        {
            Layer = layer;
        }

        /// <summary>Cada subclase construye SU entidad; no sabe nada de capas ni de cómo se agrega.</summary>
        protected abstract Entity CreateEntity(CadExecutionContext context);

        public void Execute(CadExecutionContext context)
        {
            var entity = CreateEntity(context);

            if (!string.IsNullOrEmpty(Layer))
            {
                entity.Layer = Layer;
            }
            context.CurrentSpace.AppendEntity(entity);
            context.Transaction.AddNewlyCreatedDBObject(entity, true);
            context.LastCreatedHandle = entity.Handle.ToString();
        }
    }
}
