namespace AutoCadRealtimeBridge.Plugin.Documents
{
    /// <summary>
    /// Contrato para operaciones a nivel de documento (crear, abrir, guardar,
    /// cerrar). Separado de ICadCommand a propósito: estos comandos NO
    /// operan dentro de una Transaction/BlockTableRecord existente — algunos
    /// (New, Open, Close) cambian CUÁL es el documento activo.
    /// </summary>
    public interface ICadDocumentCommand
    {
        object Execute();
    }
}