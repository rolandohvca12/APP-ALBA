using System.Collections.Generic;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Única responsabilidad: ejecutar una lista de sub-comandos dentro de
    /// la MISMA transacción, para evitar N round-trips WebSocket al dibujar
    /// planos con muchos elementos. No sabe qué tipo de comandos contiene
    /// — delega cada uno vía polimorfismo (ICadCommand.Execute).
    /// </summary>
    public class BatchCommand : ICadCommand
    {
        private readonly IReadOnlyList<ICadCommand> _commands;

        public BatchCommand(IReadOnlyList<ICadCommand> commands)
        {
            _commands = commands;
        }

        public void Execute(CadExecutionContext context)
        {
            foreach (var command in _commands)
            {
                command.Execute(context);
            }
        }
    }
}