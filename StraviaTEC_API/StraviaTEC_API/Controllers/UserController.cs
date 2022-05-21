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
    public class UserController : Controller
    {
        private SQLConfig connectionStr;

        public UserController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllUsers";
            return Ok(await db.QueryAsync<User>(sql, new { }));
        }
        [HttpGet("Account/{_username}/{_password}")]
        public async Task<IActionResult> GetbyName(string _username, string _password)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserByUsername @UserName = @username, @Password = @password";
            return Ok(await db.QueryFirstOrDefaultAsync<User>(sql, new { username = _username, password = _password }));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertUser", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }
        

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateUser", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("Account/{_username}/{_password}")]
        public async Task<IActionResult> Delete(string _username, string _password)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteUser @UserName = @username, @Password = @password";
            var result = await db.ExecuteAsync(sql, new { username = _username, password = _password });

            return NoContent();
        }
        [HttpPost("AddFriend")]
        public async Task<IActionResult> AddFriend([FromBody] Adds newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertAdds", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        } 
        [HttpGet("FriendsList")]
        public async Task<IActionResult> GetFriends(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectFriendsList @UserName = @username";
            return Ok(await db.QueryFirstOrDefaultAsync<Adds>(sql, new { username = _username }));
        }
    }
}
