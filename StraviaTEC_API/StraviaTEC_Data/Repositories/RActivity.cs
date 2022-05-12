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

        public async Task<IEnumerable<Activity>> GetAllActivities()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM Activity ";
            return await db.QueryAsync<Activity>(sql, new { });
        }
    }
}
