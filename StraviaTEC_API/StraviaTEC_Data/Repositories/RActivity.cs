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
                       FROM Activity";
            return await db.QueryAsync<Activity>(sql, new { });
        }

        public async Task<Activity> GetbyId(int _id)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM Activity 
                       WHERE id = @id";
            return await db.QueryFirstOrDefaultAsync<Activity>(sql, new { id = _id });
        }

        public async Task<Activity> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM Activity 
                       WHERE name = @name";
            return await db.QueryFirstOrDefaultAsync<Activity>(sql, new { name = _name });
        }

        public async Task<bool> Insert(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO Activity (name,date,duration,mileage,sport_name)
                        VALUES (@name,@date,@duration,@mileage,@sport_name)";
            var result = await db.ExecuteAsync(sql, new
            {
                _activity.name,
                _activity.date,
                _activity.duration,
                _activity.mileage,
                _activity.sport_name

            });
            return result > 0;
        }

        public async Task<bool> Update(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE Activity 
                        SET 
                            name = @name,
                            date = @date,
                            duration = @duration,
                            mileage = @mileage,
                            sport_name = @sport_name
                        WHERE id = @id";
            var result = await db.ExecuteAsync(sql, new
            {
                _activity.name,
                _activity.date,
                _activity.duration,
                _activity.mileage,
                _activity.sport_name,
                _activity.id

            });
            return result > 0;
        }

        public async Task<bool> Delete(Activity _activity)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM Activity
                        WHERE id = @id";
            var result = await db.ExecuteAsync(sql, new { id = _activity.id });
            return result > 0;
        }
    }
}
