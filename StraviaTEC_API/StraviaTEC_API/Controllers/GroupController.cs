using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private SQLConfig connectionStr;

        public GroupController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllGroups";
            return Ok(await db.QueryAsync<Group>(sql, new { }));
        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectGroupByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Group>(sql, new { name = _name }));

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Group newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertGroup", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Group _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateGroup", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("ByName/{_name}")]
        public async Task<IActionResult> Delete(string _name)
        {

            var db = dbConnection();
            var sql = @"DeleteGroup @Name = @name";
            var result = await db.ExecuteAsync(sql, new { name = _name });

            return NoContent();
        }

    }
}
