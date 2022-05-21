using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StraviaTEC_Data;
using StraviaTEC_Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;
namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : Controller
    {
        
        private SQLConfig connectionStr;

        public ActivityController(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllActivities";
            return Ok(await db.QueryAsync<Activity>(sql, new { }));
        }
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectActivityById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Activity>(sql, new { id = ID }));
            
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Activity newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertActivity", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result>0);
        }
        
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Activity _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateActivity", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }
        
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"DeleteActivity @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }
    }
}
