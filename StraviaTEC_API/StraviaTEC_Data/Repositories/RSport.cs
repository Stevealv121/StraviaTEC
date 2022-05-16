using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RSport : ISport
    {
        private SQLConfig connectionStr;

        public RSport(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Sport _sport)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Sport>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Sport> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Sport _sport)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Sport _sport)
        {
            throw new NotImplementedException();
        }
    }
}
