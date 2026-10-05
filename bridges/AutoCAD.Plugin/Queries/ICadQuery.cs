namespace AutoCadRealtimeBridge.Plugin.Queries
{
    public interface ICadQuery
    {
        object Execute(CadQueryContext context);
    }
}