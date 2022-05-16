using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RUser : IUser
    {
        private SQLConfig connectionStr;

        public RUser(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(User _user)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserDetails(string _username, string _password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(User _user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(User _user)
        {
            throw new NotImplementedException();
        }
    }
}
