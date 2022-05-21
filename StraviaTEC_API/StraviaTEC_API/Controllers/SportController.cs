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
    public class SportController : Controller
    {
        private SQLConfig connectionStr;

        public SportController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllSports";
            return Ok(await db.QueryAsync<Sport>(sql, new { }));
        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSportByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Sport>(sql, new { name = _name }));

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sport newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertSport", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Sport _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateSport", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("ByName/{_name}")]
        public async Task<IActionResult> Delete(string _name)
        {

            var db = dbConnection();
            var sql = @"DeleteSport @Name = @name";
            var result = await db.ExecuteAsync(sql, new { name = _name });

            return NoContent();
        }
    }
}
