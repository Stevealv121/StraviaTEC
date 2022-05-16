using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RGroup : IGroup
    {
        private SQLConfig connectionStr;

        public RGroup(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Group _group)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Group>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Group> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Group _group)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Group _group)
        {
            throw new NotImplementedException();
        }
    }
}
