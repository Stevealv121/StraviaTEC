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

        /// <summary>
        /// It creates a new connection to the database.
        /// </summary>
        /// <returns>
        /// A new instance of the SqlConnection class.
        /// </returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        /// <summary>
        /// It's a GET request that returns a list of all users in the database
        /// </summary>
        /// <returns>
        /// A list of users.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllUsers";
            return Ok(await db.QueryAsync<User>(sql, new { }));
        }
        /// <summary>
        /// It takes a string parameter, and returns a list of users with the similar name
        /// </summary>
        /// <param name="_firstname">The name of the user you want to search for.</param>
        /// <returns>
        /// A list of users with the firstname that was passed in.
        /// </returns>
        [HttpGet("SearchUsers/{_firstname}")]
        public async Task<IActionResult> Search(string _firstname)
        {
            var db = dbConnection();
            var sql = @"EXEC SearchUsers @firstname";
            return Ok(await db.QueryAsync<User>(sql, new { firstname = _firstname }));
        }

        /// <summary>
        /// It takes in a username and password, and returns a user object if the username and password
        /// match
        /// </summary>
        /// <param name="_username">the username of the user</param>
        /// <param name="_password">"test"</param>
        /// <returns>
        /// The user object is being returned.
        /// </returns>
        [HttpGet("Login/{_username}/{_password}")]
        public async Task<IActionResult> GetbyName(string _username, string _password)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserByUsername @UserName = @username, @Password = @password";
            return Ok(await db.QueryFirstOrDefaultAsync<User>(sql, new { username = _username, password = _password }));
        }

        /// <summary>
        /// It takes a JSON User object from the body of the request, and then inserts it into the database
        /// </summary>
        /// <param name="User">The object that will be passed in the body of the request.</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
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
        

        /// <summary>
        /// It takes a User JSON object from the body of the request, and then it updates the database with
        /// the values of the JSON object
        /// </summary>
        /// <param name="User"></param>
        /// <returns>
        /// NoContent()
        /// </returns>
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

        /// <summary>
        /// This function deletes a user from the database
        /// </summary>
        /// <param name="_username">The username of the account to be deleted</param>
        /// <param name="_password">The password of the user to be deleted</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("Account/{_username}/{_password}")]
        public async Task<IActionResult> Delete(string _username, string _password)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteUser @UserName = @username, @Password = @password";
            var result = await db.ExecuteAsync(sql, new { username = _username, password = _password });

            return NoContent();
        }
        /// <summary>
        /// It adds a friend to the database
        /// </summary>
        /// <param name="Adds"></param>
        /// <returns>
        /// The result of the stored procedure.
        /// </returns>
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
        /// <summary>
        /// This function deletes a friend from the database
        /// </summary>
        /// <param name="Adds"></param>
        /// <returns>
        /// The result of the stored procedure is being returned.
        /// </returns>
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
        /// <summary>
        /// It takes a username as a parameter and returns a list of friends for that user
        /// </summary>
        /// <param name="_username">The username of the user who's friends list you want to
        /// retrieve.</param>
        /// <returns>
        /// A list of friends
        /// </returns>
        [HttpGet("FriendsList/{_username}")]
        public async Task<IActionResult> GetFriends(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectFriendlist @UserName = @username";
            return Ok(await db.QueryAsync<FriendView>(sql, new { username = _username }));
        }

        /// <summary>
        /// It takes a username as a parameter and returns a list of all the posts made by the user's
        /// friends
        /// </summary>
        /// <param name="_username">The username of the user who's friends' activities you want to
        /// see.</param>
        /// <returns>
        /// A list of FriendPost objects.
        /// </returns>
        [HttpGet("FriendsActivities/{_username}")]
        public async Task<IActionResult> GetFriendsActivities(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectFriendPosts @username";
            return Ok(await db.QueryAsync<FriendPost>(sql, new { username = _username }));
        }

        /// <summary>
        /// It takes a username as a parameter, connects to the database, and executes a stored
        /// procedure called SelectUserNumbers that retrns followers, following and activity numbers
        /// </summary>
        /// <param name="_username">The username of the user you want to get the numbers for.</param>
        /// <returns>
        /// A list of UserNumbers objects.
        /// </returns>
        [HttpGet("UserNumbers/{_username}")]
        public async Task<IActionResult> GetUserNumbers(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserNumbers  @username";
            return Ok(await db.QueryAsync<UserNumbers>(sql, new { username = _username }));
        }
    }
}
