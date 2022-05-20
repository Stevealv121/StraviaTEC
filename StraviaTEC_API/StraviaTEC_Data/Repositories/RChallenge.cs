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
        public async Task<bool> Delete(Challenge _challenge)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM CHALLENGE
                        WHERE Id = @Id";
            var result = await db.ExecuteAsync(sql, new { Id = _challenge.Id });
            return result > 0;
        }

        public async Task<IEnumerable<Challenge>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM CHALLENGE";
            return await db.QueryAsync<Challenge>(sql, new { });
        }

        public async Task<Challenge> GetbyId(int _id)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM CHALLENGE 
                       WHERE Id = @id";
            return await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { id = _id });
        }

        public async Task<Challenge> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM CHALLENGE 
                       WHERE Name = @Name";
            return await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Challenge _challenge)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO CHALLENGE (ValidThru, Type, Access, Name, ActivityId, CategoryName)
                        VALUES (@ValidThru, @Type, @Access, @Name, @ActivityId, @CategoryName)";
            var result = await db.ExecuteAsync(sql, new
            {
                _challenge.ValidThru,
                _challenge.Type,
                _challenge.Access,
                _challenge.Name,
                _challenge.ActivityId,
                _challenge.CategoryName


            });
            return result > 0;
        }

        public async Task<bool> Update(Challenge _challenge)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE CHALLENGE 
                        SET 
                            ValidThru = @ValidThru,
                            Type = @Type,
                            Access = @Access,
                            Name = @Name,
                            ActivityId = @ActivityId,
                            CategoryName = @CategoryName
                        WHERE Id = @Id";
            var result = await db.ExecuteAsync(sql, new
            {
                _challenge.ValidThru,
                _challenge.Type,
                _challenge.Access,
                _challenge.Name,
                _challenge.ActivityId,
                _challenge.CategoryName,
                _challenge.Id

            });
            return result > 0;
        }
    }
}
