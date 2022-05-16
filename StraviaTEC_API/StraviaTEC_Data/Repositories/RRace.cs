using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RRace : IRace
    {
        private SQLConfig connectionStr;

        public RRace(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Race _race)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Race>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Race> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Race> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Race _race)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Race _race)
        {
            throw new NotImplementedException();
        }
    }
}
