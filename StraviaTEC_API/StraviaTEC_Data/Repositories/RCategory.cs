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
        public async Task<bool> Delete(Category _category)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM CATEGORY
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new { Name = _category.Name });
            return result > 0;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM CATEGORY";
            return await db.QueryAsync<Category>(sql, new { });
        }

        public async Task<Category> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM CATEGORY 
                       WHERE Name = @Name";
            return await db.QueryFirstOrDefaultAsync<Category>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Category _category)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO CATEGORY (Name, Description)
                        VALUES (@Name, @Description)";
            var result = await db.ExecuteAsync(sql, new
            {
                _category.Name,
                _category.Description
            });
            return result > 0;
        }

        public async Task<bool> Update(Category _category)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE CATEGORY 
                        SET 
                            Name = @Name,
                            Description = @Description
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new
            {
                _category.Name,
                _category.Description

            });
            return result > 0;
        }
    }
}
