namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Contrato polimórfico: cada tipo de comando recibido por WebSocket
    /// implementa su propia lógica de ejecución contra el dibujo activo.
    /// </summary>
    public interface ICadCommand
    {
        void Execute(CadExecutionContext context);
    }
}
