using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RSponsor : ISponsor
    {
        private SQLConfig connectionStr;

        public RSponsor(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Sponsor>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Sponsor> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Sponsor> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }
    }
}
