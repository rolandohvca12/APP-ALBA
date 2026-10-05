using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Commands
{
    /// <summary>
    /// Agrupa lo que todo comando necesita para ejecutarse, evitando pasar
    /// Transaction/BlockTableRecord/Database como parámetros sueltos.
    /// </summary>
    public class CadExecutionContext
    {
        public Transaction Transaction { get; }
        public BlockTableRecord CurrentSpace { get; }
        public Database Database { get; }
        public string LastCreatedHandle { get; set; }
        public CadExecutionContext(Transaction tr, BlockTableRecord btr, Database db)
        {
            Transaction = tr;
            CurrentSpace = btr;
            Database = db;
        }
    }
}