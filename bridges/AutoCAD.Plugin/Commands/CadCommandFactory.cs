using System;
using System.Collections.Generic;
using System.Text.Json;
using Autodesk.AutoCAD.Geometry;
using AutoCadRealtimeBridge.Plugin.Commands;

namespace AutoCadRealtimeBridge.Plugin
{
    /// <summary>
    /// Traduce el JSON recibido a una instancia concreta de ICadCommand.
    /// Agregar un tipo de comando nuevo = una entrada en el diccionario;
    /// nunca hay que tocar el dispatcher ni las clases existentes.
    /// </summary>
    public class CadCommandFactory
    {
        private readonly Dictionary<string, Func<JsonElement, ICadCommand>> _builders
            = new Dictionary<string, Func<JsonElement, ICadCommand>>();

        public CadCommandFactory()
        {
            Register("line", cmd => new LineCommand(
                ReadPoint(cmd.GetProperty("p1")),
                ReadPoint(cmd.GetProperty("p2")),
                ReadLayer(cmd)));

            Register("circle", cmd => new CircleCommand(
                ReadPoint(cmd.GetProperty("center")),
                cmd.GetProperty("radius").GetDouble(),
                ReadLayer(cmd)));

            Register("polyline", cmd => new PolylineCommand(
                ReadPoints(cmd.GetProperty("points")),
                cmd.TryGetProperty("closed", out var c) && c.GetBoolean(),
                ReadLayer(cmd)));

            Register("rectangle", cmd => new RectangleCommand(
                ReadPoint(cmd.GetProperty("p1")),
                ReadPoint(cmd.GetProperty("p2")),
                ReadLayer(cmd)));

            Register("text", cmd => new TextCommand(
                ReadPoint(cmd.GetProperty("position")),
                cmd.GetProperty("height").GetDouble(),
                cmd.GetProperty("content").GetString(),
                cmd.TryGetProperty("style", out var st) ? st.GetString() : null,
                cmd.TryGetProperty("rotation", out var rot) ? rot.GetDouble() : 0.0,
                ReadLayer(cmd)));

            Register("dimLinear", cmd => new DimLinearCommand(
                ReadPoint(cmd.GetProperty("p1")),
                ReadPoint(cmd.GetProperty("p2")),
                ReadPoint(cmd.GetProperty("dimLinePoint")),
                cmd.TryGetProperty("style", out var dstStyle) ? dstStyle.GetString() : null,
                ReadLayer(cmd)));

            Register("createLayer", cmd => new CreateLayerCommand(
                cmd.GetProperty("name").GetString(),
                cmd.TryGetProperty("color", out var col) ? (short)col.GetInt32() : (short)7));
            Register("arc", cmd => new ArcCommand(
            ReadPoint(cmd.GetProperty("center")),
            cmd.GetProperty("radius").GetDouble(),
            cmd.GetProperty("startAngle").GetDouble(), // radianes
            cmd.GetProperty("endAngle").GetDouble(),
            ReadLayer(cmd)));

            Register("ellipse", cmd => new EllipseCommand(
                ReadPoint(cmd.GetProperty("center")),
                new Vector3d(cmd.GetProperty("majorAxisX").GetDouble(), cmd.GetProperty("majorAxisY").GetDouble(), 0),
                cmd.GetProperty("radiusRatio").GetDouble(),
                ReadLayer(cmd)));

            Register("hatch", cmd => new HatchCommand(
                ReadPoints(cmd.GetProperty("boundary")),
                cmd.TryGetProperty("pattern", out var pat) ? pat.GetString() : "ANSI31",
                cmd.TryGetProperty("scale", out var sc) ? sc.GetDouble() : 1.0,
                ReadLayer(cmd)));

            Register("defineBlock", cmd =>
            {
                var name = cmd.GetProperty("name").GetString();
                var geometryEl = cmd.GetProperty("geometry");
                var subCommands = new List<ICadCommand>();
                foreach (var sub in geometryEl.EnumerateArray())
                {
                    subCommands.Add(Create(sub)); // recursivo: reutiliza la misma fábrica
                }
                return new DefineBlockCommand(name, subCommands);
            });

            Register("insertBlock", cmd => new InsertBlockCommand(
                cmd.GetProperty("blockName").GetString(),
                ReadPoint(cmd.GetProperty("position")),
                cmd.TryGetProperty("scale", out var sc) ? sc.GetDouble() : 1.0,
                cmd.TryGetProperty("rotation", out var rot) ? rot.GetDouble() : 0.0,
                ReadLayer(cmd)));
            Register("clearModel", cmd => new ClearModelCommand());
            Register("batch", cmd =>
            {
                var itemsEl = cmd.GetProperty("commands");
                var subCommands = new List<ICadCommand>();
                foreach (var sub in itemsEl.EnumerateArray())
                {
                    subCommands.Add(Create(sub));
                }
                return new BatchCommand(subCommands);
            });
            Register("defineTextStyle", cmd => new DefineTextStyleCommand(
                cmd.GetProperty("name").GetString(),
                cmd.TryGetProperty("font", out var f) ? f.GetString() : "romans.shx",
                cmd.TryGetProperty("widthFactor", out var wf) ? wf.GetDouble() : 1.0));

            Register("defineDimStyle", cmd => new DefineDimStyleCommand(
                cmd.GetProperty("name").GetString(),
                cmd.TryGetProperty("decimalPlaces", out var dp) ? dp.GetInt32() : 2,
                cmd.TryGetProperty("textHeight", out var th) ? th.GetDouble() : 0.18,
                cmd.TryGetProperty("scale", out var sc) ? sc.GetDouble() : 1.0));
            Register("tagEntity", cmd => new TagEntityCommand(
                cmd.GetProperty("handle").GetString(),
                cmd.GetProperty("tag").GetString()));
        }

        public void Register(string type, Func<JsonElement, ICadCommand> builder)
        {
            _builders[type] = builder;
        }

        public ICadCommand Create(JsonElement cmd)
        {
            var type = cmd.GetProperty("type").GetString();
            if (!_builders.TryGetValue(type, out var builder))
            {
                throw new InvalidOperationException($"Tipo de comando desconocido: {type}");
            }
            return builder(cmd);
        }

        private static Point3d ReadPoint(JsonElement p)
        {
            var z = p.TryGetProperty("z", out var zEl) ? zEl.GetDouble() : 0.0;
            return new Point3d(p.GetProperty("x").GetDouble(), p.GetProperty("y").GetDouble(), z);
        }

        private static List<Point3d> ReadPoints(JsonElement arr)
        {
            var list = new List<Point3d>();
            foreach (var p in arr.EnumerateArray()) list.Add(ReadPoint(p));
            return list;
        }

        private static string ReadLayer(JsonElement cmd)
            => cmd.TryGetProperty("layer", out var l) ? l.GetString() : null;
    }
}