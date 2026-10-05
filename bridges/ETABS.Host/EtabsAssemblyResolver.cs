using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace EtabsRealtimeBridge.Host
{
    internal static class EtabsAssemblyResolver
    {
        private const string AssemblyFileName = "ETABSv1.dll";
        private static string _assemblyPath;

        public static string Register(string explicitPath)
        {
            _assemblyPath = FindAssembly(explicitPath);
            AppDomain.CurrentDomain.AssemblyResolve += Resolve;
            Assembly.LoadFrom(_assemblyPath);
            return _assemblyPath;
        }

        private static Assembly Resolve(object sender, ResolveEventArgs args)
        {
            var requested = new AssemblyName(args.Name);
            return string.Equals(requested.Name, "ETABSv1", StringComparison.OrdinalIgnoreCase)
                ? Assembly.LoadFrom(_assemblyPath)
                : null;
        }

        private static string FindAssembly(string explicitPath)
        {
            var candidates = new List<string>();
            AddCandidate(candidates, explicitPath);
            AddCandidate(candidates, Environment.GetEnvironmentVariable("ETABS_API_DLL"));

            var programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            var csiRoot = Path.Combine(programFiles, "Computers and Structures");
            AddCandidate(candidates, Path.Combine(csiRoot, "ETABS 22", AssemblyFileName));

            if (Directory.Exists(csiRoot))
            {
                candidates.AddRange(Directory.GetDirectories(csiRoot, "ETABS *")
                    .Select(directory => Path.Combine(directory, AssemblyFileName))
                    .Where(File.Exists)
                    .OrderByDescending(GetAssemblyVersion));
            }

            var match = candidates.FirstOrDefault(File.Exists);
            if (match != null) return Path.GetFullPath(match);

            throw new FileNotFoundException(
                "ETABSv1.dll was not found. Install ETABS or set ETABS_API_DLL to its full path.");
        }

        private static void AddCandidate(ICollection<string> candidates, string path)
        {
            if (!string.IsNullOrWhiteSpace(path)) candidates.Add(path);
        }

        private static Version GetAssemblyVersion(string path)
        {
            try { return AssemblyName.GetAssemblyName(path).Version; }
            catch { return new Version(0, 0); }
        }
    }
}
