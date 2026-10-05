using System;
using System.Collections.Generic;
using System.Text.Json;

namespace AutoCadRealtimeBridge.Plugin.Documents
{
    public class CadDocumentCommandFactory
    {
        private readonly Dictionary<string, Func<JsonElement, ICadDocumentCommand>> _builders
            = new Dictionary<string, Func<JsonElement, ICadDocumentCommand>>();

        public CadDocumentCommandFactory()
        {
            Register("newDrawing", cmd => new NewDrawingCommand(
                cmd.TryGetProperty("templatePath", out var t) ? t.GetString() : null));

            Register("openDrawing", cmd => new OpenDrawingCommand(
                cmd.GetProperty("path").GetString()));

            Register("saveDrawing", cmd => new SaveDrawingCommand(
                cmd.TryGetProperty("savePath", out var p) ? p.GetString() : null));

            Register("closeDrawing", cmd => new CloseDrawingCommand(
                cmd.TryGetProperty("saveChanges", out var s) && s.GetBoolean()));
        }

        public void Register(string type, Func<JsonElement, ICadDocumentCommand> builder) => _builders[type] = builder;

        public ICadDocumentCommand Create(JsonElement cmd)
        {
            var type = cmd.GetProperty("type").GetString();
            if (!_builders.TryGetValue(type, out var builder))
                throw new InvalidOperationException($"Comando de documento desconocido: {type}");
            return builder(cmd);
        }
    }
}