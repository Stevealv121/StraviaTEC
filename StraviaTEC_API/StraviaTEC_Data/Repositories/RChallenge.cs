using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RChallenge : IChallenge
    {
        private SQLConfig connectionStr;

        public RChallenge(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Challenge _challenge)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Challenge>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Challenge> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Challenge> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Challenge _challenge)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Challenge _challenge)
        {
            throw new NotImplementedException();
        }
    }
}
