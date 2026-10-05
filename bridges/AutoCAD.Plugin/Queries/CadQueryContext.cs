using Autodesk.AutoCAD.DatabaseServices;

namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public class CadQueryContext
    {
        public Transaction Transaction { get; }
        public Database Database { get; }

        public CadQueryContext(Transaction tr, Database db)
        {
            Transaction = tr;
            Database = db;
        }
    }
}