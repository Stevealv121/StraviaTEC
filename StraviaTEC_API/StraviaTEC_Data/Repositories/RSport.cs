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
        public async Task<bool> Delete(Sport _sport)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM SPORT
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new { Name = _sport.Name });
            return result > 0;
        }

        public async Task<IEnumerable<Sport>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM SPORT";
            return await db.QueryAsync<Sport>(sql, new { });
        }

        public async Task<Sport> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM SPORT 
                       WHERE Name = @Name";
            return await db.QueryFirstOrDefaultAsync<Sport>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Sport _sport)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO SPORT (Name, Description)
                        VALUES (@Name, @Description)";
            var result = await db.ExecuteAsync(sql, new
            {
                _sport.Name,
                _sport.Description
            });
            return result > 0;
        }

        public async Task<bool> Update(Sport _sport)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE SPORT 
                        SET 
                            Name = @Name,
                            Description = @Description
                        WHERE Name = @Name";
            var result = await db.ExecuteAsync(sql, new
            {
                _sport.Name,
                _sport.Description

            });
            return result > 0;
        }
    }
}
