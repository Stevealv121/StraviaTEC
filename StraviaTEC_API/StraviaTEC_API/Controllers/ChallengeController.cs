using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeController : Controller
    {
        private SQLConfig connectionStr;

        public ChallengeController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllChallenges";
            return Ok(await db.QueryAsync<Challenge>(sql, new { }));
        }
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectChallengeById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { id = ID }));

        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectChallengeByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { name = _name }));

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Challenge newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertChallenge", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Challenge _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateChallenge", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteChallenge @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }
        [HttpGet("ByUserName/{_username}")]
        public async Task<IActionResult> GetbyUserName(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserChallenge @user";
            return Ok(await db.QueryAsync<Challenge>(sql, new { user = _username }));

        }

        //
        [HttpPost("JoinChallenge/{_username}/{_challengeid}")]
        public async Task<IActionResult> Join(string _username, int _challengeid)
        {

            var db = dbConnection();
            var sql = @"EXEC JoinChallenge @username, @challengeid";
            var result = await db.ExecuteAsync(sql, new { username = _username, challengeid = _challengeid });

            return NoContent();
        }
        [HttpDelete("ExitChallenge/{_username}/{_challengeid}")]
        public async Task<IActionResult> Exit(string _username, int _challengeid)
        {

            var db = dbConnection();
            var sql = @"EXEC ExitChallenge @username, @challengeid";
            var result = await db.ExecuteAsync(sql, new { username = _username, challengeid = _challengeid });

            return NoContent();
        }
    }
}
