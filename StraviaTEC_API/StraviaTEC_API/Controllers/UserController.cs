using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("SearchUsers/{_firstname}")]
        public async Task<IActionResult> Search(string _firstname)
        {
            var db = dbConnection();
            var sql = @"EXEC SearchUsers @firstname";
            return Ok(await db.QueryAsync<User>(sql, new { firstname = _firstname }));
        }

        [HttpGet("Login/{_username}/{_password}")]
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
            var sql = @"EXEC UpdateUser @UserName, @FirstName, @SecondName, @FirstSurname, @SecondSurname, @Password,@Level, @ProfilePicture, @BirthDate, @Nationality";
            var values = new
            {
                UserName = _obj.UserName,
                FirstName = _obj.FirstName,
                SecondName = _obj.SecondName,
                FirstSurname = _obj.FirstSurname,
                SecondSurname = _obj.SecondSurname,
                Password = _obj.Password,
                Level = _obj.Level,
                ProfilePicture = _obj.ProfilePicture,
                BirthDate = _obj.BirthDate,
                Nationality = _obj.Nationality
            };
            
            db.Execute(sql, values);

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
            var result = db.Execute("AddFriend", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }
        [HttpDelete("DeleteFriend")]
        public async Task<IActionResult> DeleteFriend([FromBody] Adds newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("DeleteFriend", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }
        [HttpGet("FriendsList/{_username}")]
        public async Task<IActionResult> GetFriends(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectFriendlist @UserName = @username";
            return Ok(await db.QueryAsync<FriendView>(sql, new { username = _username }));
        }

        [HttpGet("FriendsActivities/{_username}")]
        public async Task<IActionResult> GetFriendsActivities(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectFriendPosts @username";
            return Ok(await db.QueryAsync<FriendPost>(sql, new { username = _username }));
        }

        [HttpGet("UserNumbers/{_username}")]
        public async Task<IActionResult> GetUserNumbers(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserNumbers  @username";
            return Ok(await db.QueryAsync<UserNumbers>(sql, new { username = _username }));
        }
    }
}
