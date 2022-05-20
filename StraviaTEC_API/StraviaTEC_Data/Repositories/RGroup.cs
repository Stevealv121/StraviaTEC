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
        public async Task<bool> Delete(Group _group)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM [GROUP]
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new { Name = _group.Name });
            return result > 0;
        }

        public async Task<IEnumerable<Group>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM [GROUP]";
            return await db.QueryAsync<Group>(sql, new { });
        }

        public async Task<Group> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM [GROUP]
                       WHERE Name = @Name";
            return await db.QueryFirstOrDefaultAsync<Group>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Group _group)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO [GROUP] (Name, Description)
                        VALUES (@Name, @Description)";
            var result = await db.ExecuteAsync(sql, new
            {
                _group.Name,
                _group.Description
            });
            return result > 0;
        }

        public async Task<bool> Update(Group _group)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE [GROUP] 
                        SET 
                            Name = @Name,
                            Description = @Description
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new
            {
                _group.Name,
                _group.Description

            });
            return result > 0;
        }
    }
}
