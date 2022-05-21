using Microsoft.AspNetCore.Mvc;
using StraviaTEC_Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceController : Controller
    {
        private SQLConfig connectionStr;

        public RaceController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllRaces";
            return Ok(await db.QueryAsync<Challenge>(sql, new { }));
        }
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Race>(sql, new { id = ID }));

        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Race>(sql, new { name = _name }));

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Race newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertRace", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Race _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateRace", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"DeleteRace @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }
    }
}
