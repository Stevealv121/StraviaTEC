using StraviaTEC_Models;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RCategory : ICategory
    {
        private SQLConfig connectionStr;

        public RCategory(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public Task<bool> Delete(Category _category)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Category _category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Category _category)
        {
            throw new NotImplementedException();
        }
    }
}
