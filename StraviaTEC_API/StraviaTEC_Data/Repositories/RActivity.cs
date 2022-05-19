using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RActivity : IActivity
    {
        private SQLConfig connectionStr;

        public RActivity(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        public async Task<IEnumerable<Activity>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM ACTIVITY";
            return await db.QueryAsync<Activity>(sql, new { });
        }

        public async Task<Activity> GetbyId(int _id)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM ACTIVITY 
                       WHERE Id = @id";
            return await db.QueryFirstOrDefaultAsync<Activity>(sql, new { id = _id });
        }

        public async Task<bool> Insert(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO ACTIVITY (Date,Duration,Mileage,Route,SportName)
                        VALUES (@Date,@Duration,@Mileage,@Route,@SportName)";
            var result = await db.ExecuteAsync(sql, new
            {
                _activity.Date,
                _activity.Duration,
                _activity.Mileage,
                _activity.Route,
                _activity.SportName

            });
            return result > 0;
        }

        public async Task<bool> Update(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE ACTIVITY 
                        SET 
                            Date = @Date,
                            Duration = @Duration,
                            Mileage = @Mileage,
                            Route = @Route,
                            SportName = @SportName
                        WHERE Id = @Id";
            var result = await db.ExecuteAsync(sql, new
            {
                _activity.Date,
                _activity.Duration,
                _activity.Mileage,
                _activity.Route,
                _activity.SportName,
                _activity.Id

            });
            return result > 0;
        }

        public async Task<bool> Delete(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM ACTIVITY
                        WHERE Id = @Id";
            var result = await db.ExecuteAsync(sql, new { Id = _activity.Id });
            return result > 0;
        }
    }
}
