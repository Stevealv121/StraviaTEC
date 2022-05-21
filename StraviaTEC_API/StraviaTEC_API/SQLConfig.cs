
namespace StraviaTEC_API
{
    public class SQLConfig
    {
        public SQLConfig(string connectionStr) => ConnectionStr = connectionStr;
        public string ConnectionStr { get; set; }
    }
}
