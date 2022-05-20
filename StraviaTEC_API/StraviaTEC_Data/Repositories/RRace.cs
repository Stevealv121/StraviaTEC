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
        public async Task<bool> Delete(Race _race)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM RACE
                        WHERE ID = @Id";
            var result = await db.ExecuteAsync(sql, new { Id = _race.ID });
            return result > 0;
        }

        public async Task<IEnumerable<Race>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM RACE";
            return await db.QueryAsync<Race>(sql, new { });
        }

        public async Task<Race> GetbyId(int _id)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM RACE 
                       WHERE Id = @id";
            return await db.QueryFirstOrDefaultAsync<Race>(sql, new { id = _id });
        }

        public async Task<Race> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM RACE 
                       WHERE Name = @Name";
            return await db.QueryFirstOrDefaultAsync<Race>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Race _race)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO RACE (Name,Cost,Date,Access,ActivityID)
                        VALUES (@Name,@Cost,@Date,@Access,@ActivityID)";
            var result = await db.ExecuteAsync(sql, new
            {
                _race.Name,
                _race.Cost,
                _race.Date,
                _race.Access,
                _race.ActivityID

            });
            return result > 0;
        }

        public async Task<bool> Update(Race _race)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE RACE 
                        SET 
                            Name = @Name,
                            Cost = @Cost,
                            Date = @Date,
                            Access = @Access,
                            ActivityID = @ActivityID,

                        WHERE ID = @Id";
            var result = await db.ExecuteAsync(sql, new
            {
                _race.Name,
                _race.Cost,
                _race.Date,
                _race.Access,
                _race.ActivityID

            });
            return result > 0;
        }
    }
}
