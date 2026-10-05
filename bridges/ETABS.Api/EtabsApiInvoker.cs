using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.Json;
using ETABSv1;

namespace EtabsRealtimeBridge.ETABS
{
    public sealed class EtabsApiInvoker : IEtabsApiInvoker
    {
        private readonly cOAPI _oapi;
        private readonly cSapModel _sapModel;
        private readonly Dictionary<string, ApiTarget> _targets;

        public EtabsApiInvoker(EtabsSession session)
        {
            _oapi = session.Oapi;
            _sapModel = session.SapModel;
            _targets = BuildTargets();
        }

        public EtabsInvocationResult Invoke(EtabsRpcRequest request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));
            if (string.IsNullOrWhiteSpace(request.Api)) throw new ArgumentException("Missing ETABS api.");
            if (string.IsNullOrWhiteSpace(request.Method)) throw new ArgumentException("Missing ETABS method.");

            var target = ResolveTarget(request.Api);
            var method = target.ResolveMethod(request.Method);
            if (method == null)
            {
                throw new MissingMethodException(target.InterfaceType.FullName, request.Method);
            }

            var parameters = method.GetParameters();
            var args = new object[parameters.Length];

            for (var i = 0; i < parameters.Length; i++)
            {
                args[i] = BuildArgument(parameters[i], request.Parameters);
            }

            object returnValue;
            try
            {
                returnValue = method.Invoke(target.Instance, args);
            }
            catch (TargetInvocationException exception) when (exception.InnerException != null)
            {
                System.Runtime.ExceptionServices.ExceptionDispatchInfo.Capture(exception.InnerException).Throw();
                throw;
            }
            var result = new EtabsInvocationResult();

            if (method.ReturnType == typeof(int) && !IsDirectIntResult(method))
            {
                var code = (int)returnValue;
                if (code != 0)
                {
                    throw new EtabsApiException(target.InterfaceType.Name, method.Name, code);
                }
            }
            else if (method.ReturnType != typeof(void))
            {
                result.ReturnValue = returnValue;
            }

            for (var i = 0; i < parameters.Length; i++)
            {
                var parameter = parameters[i];
                if (parameter.ParameterType.IsByRef || parameter.IsOut)
                {
                    result.Outputs[ToCamelCase(parameter.Name)] = args[i];
                }
            }

            return result;
        }

        private static bool IsDirectIntResult(MethodInfo method)
        {
            if (method.ReturnType != typeof(int) ||
                !method.Name.StartsWith("Count", StringComparison.Ordinal))
            {
                return false;
            }

            foreach (var parameter in method.GetParameters())
            {
                if (parameter.ParameterType.IsByRef || parameter.IsOut)
                {
                    return false;
                }
            }

            return true;
        }

        private Dictionary<string, ApiTarget> BuildTargets()
        {
            var targets = new Dictionary<string, ApiTarget>(StringComparer.OrdinalIgnoreCase);
            var visited = new HashSet<Type>();

            var oapiTarget = new ApiTarget(typeof(cOAPI), _oapi);
            AddTarget(targets, "cOAPI", oapiTarget);
            AddTarget(targets, "oapi", oapiTarget);

            var sapModelTarget = new ApiTarget(typeof(cSapModel), _sapModel);
            AddTarget(targets, "cSapModel", sapModelTarget);
            AddTarget(targets, "sapModel", sapModelTarget);
            AddNestedTargets(targets, visited, typeof(cSapModel), new PropertyInfo[0]);

            return targets;
        }

        private void AddNestedTargets(Dictionary<string, ApiTarget> targets, HashSet<Type> visited, Type interfaceType, PropertyInfo[] parentPath)
        {
            if (!visited.Add(interfaceType)) return;

            foreach (var property in interfaceType.GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (!property.CanRead || !property.PropertyType.IsInterface) continue;

                var path = new PropertyInfo[parentPath.Length + 1];
                Array.Copy(parentPath, path, parentPath.Length);
                path[path.Length - 1] = property;
                var target = new ApiTarget(property.PropertyType, _sapModel, path);

                AddTarget(targets, property.PropertyType.Name, target);
                AddTarget(targets, property.Name, target);
                AddTarget(targets, ToCamelCase(property.Name), target);

                if (property.PropertyType.Name.StartsWith("c", StringComparison.Ordinal) && property.PropertyType.Name.Length > 1)
                {
                    AddTarget(targets, ToCamelCase(property.PropertyType.Name.Substring(1)), target);
                }

                AddNestedTargets(targets, visited, property.PropertyType, path);
            }
        }

        private static void AddTarget(Dictionary<string, ApiTarget> targets, string key, ApiTarget target)
        {
            if (!targets.ContainsKey(key))
            {
                targets.Add(key, target);
            }
        }

        private ApiTarget ResolveTarget(string api)
        {
            ApiTarget target;
            if (_targets.TryGetValue(api, out target))
            {
                target.ResolveInstance(api);
                return target;
            }

            throw new InvalidOperationException($"Unknown ETABS API target: {api}.");
        }

        private static object BuildArgument(ParameterInfo parameter, Dictionary<string, JsonElement> supplied)
        {
            var parameterType = parameter.ParameterType;
            var isByRef = parameterType.IsByRef;
            var valueType = isByRef ? parameterType.GetElementType() : parameterType;

            JsonElement json;
            if (supplied != null && supplied.TryGetValue(parameter.Name, out json))
            {
                return ConvertJson(json, valueType);
            }

            var camelName = ToCamelCase(parameter.Name);
            if (supplied != null && supplied.TryGetValue(camelName, out json))
            {
                return ConvertJson(json, valueType);
            }

            if (isByRef || parameter.IsOut)
            {
                return DefaultValue(valueType);
            }

            if (parameter.IsOptional)
            {
                return parameter.DefaultValue;
            }

            throw new ArgumentException($"Missing required ETABS parameter: {parameter.Name}.");
        }

        private static object ConvertJson(JsonElement json, Type targetType)
        {
            if (json.ValueKind == JsonValueKind.Null)
            {
                return null;
            }

            if (targetType.IsEnum)
            {
                if (json.ValueKind == JsonValueKind.String)
                {
                    return Enum.Parse(targetType, json.GetString(), true);
                }

                return Enum.ToObject(targetType, json.GetInt32());
            }

            if (targetType == typeof(string)) return json.GetString();
            if (targetType == typeof(int)) return json.GetInt32();
            if (targetType == typeof(double)) return json.GetDouble();
            if (targetType == typeof(bool)) return json.GetBoolean();

            return JsonSerializer.Deserialize(json.GetRawText(), targetType);
        }

        private static object DefaultValue(Type type)
        {
            if (type.IsArray)
            {
                return Array.CreateInstance(type.GetElementType(), 0);
            }

            if (type == typeof(string))
            {
                return string.Empty;
            }

            return type.IsValueType ? Activator.CreateInstance(type) : null;
        }

        private static string ToCamelCase(string value)
        {
            if (string.IsNullOrEmpty(value) || char.IsLower(value[0])) return value;
            return char.ToLowerInvariant(value[0]) + value.Substring(1);
        }

        private sealed class ApiTarget
        {
            private readonly object _root;
            private readonly PropertyInfo[] _path;
            private readonly Dictionary<string, MethodInfo> _methods = new Dictionary<string, MethodInfo>(StringComparer.Ordinal);
            private object _instance;

            public Type InterfaceType { get; }
            public object Instance => _instance;

            public ApiTarget(Type interfaceType, object instance)
            {
                InterfaceType = interfaceType;
                _instance = instance;
            }

            public ApiTarget(Type interfaceType, object root, PropertyInfo[] path)
            {
                InterfaceType = interfaceType;
                _root = root;
                _path = path;
            }

            public object ResolveInstance(string api)
            {
                if (_instance != null) return _instance;

                try
                {
                    var current = _root;
                    foreach (var property in _path)
                    {
                        current = property.GetValue(current, null);
                        if (current == null) break;
                    }

                    _instance = current;
                }
                catch
                {
                    _instance = null;
                }

                if (_instance == null)
                {
                    throw new InvalidOperationException($"Unknown ETABS API target: {api}.");
                }

                return _instance;
            }

            public MethodInfo ResolveMethod(string methodName)
            {
                MethodInfo method;
                if (_methods.TryGetValue(methodName, out method))
                {
                    return method;
                }

                method = InterfaceType.GetMethod(methodName);
                if (method != null)
                {
                    _methods.Add(methodName, method);
                }

                return method;
            }
        }
    }
}
