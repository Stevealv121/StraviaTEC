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

        /// <summary>
        /// It returns a new SqlConnection object, which is initialized with the connection string
        /// stored in the connectionStr object
        /// </summary>
        /// <returns>
        /// A new instance of the SqlConnection class.
        /// </returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        /// <summary>
        /// It's a GET function that returns a list of all challenges in the database
        /// </summary>
        /// <returns>
        /// A list of challenges
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllChallenges";
            return Ok(await db.QueryAsync<Challenge>(sql, new { }));
        }
       /// <summary>
       /// This function is used to get a challenge by its ID
       /// </summary>
       /// <param name="ID">The ID of the challenge you want to get.</param>
       /// <returns>
       /// The challenge with the ID that was passed in.
       /// </returns>
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectChallengeById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { id = ID }));

        }
        /// <summary>
        /// This function is used to get a challenge by name
        /// </summary>
        /// <param name="_name">The name of the challenge you want to get</param>
        /// <returns>
        /// The challenge with the name that was passed in.
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectChallengeByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Challenge>(sql, new { name = _name }));

        }

        /// <summary>
        /// This function returns a list of challenges that a user belongs to
        /// </summary>
        /// <param name="Username">the username of the user who is trying to get the challenge</param>
        /// <returns>
        /// A list of challenges that the user belongs to.
        /// </returns>
        [HttpGet("UserJoins/{Username}")]
        public async Task<IActionResult> GetChallengebyUser(string Username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserBelongsToChallenge  @username ";
            var result = await db.QueryAsync<Challenge>(sql, new { username = Username });

            return Ok(result);
        }

       /// <summary>
       /// It takes a JSON Challenge object from the body of the request, and then inserts it into the database
       /// </summary>
       /// <param name="Challenge">This is the model that I'm using to create the new object.</param>
       /// <returns>
       /// The result of the query.
       /// </returns>
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

        /// <summary>
        /// The above function is used to update the challenge details
        /// </summary>
        /// <param name="Challenge"></param>
        /// <returns>
        /// NoContent()
        /// </returns>
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

        /// <summary>
        /// This function deletes a challenge from the database
        /// </summary>
        /// <param name="ID">The ID of the challenge to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteChallenge @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }
        /// <summary>
        /// This function is used to get all the challenges that a user has created
        /// </summary>
        /// <param name="Username">the username of the user who is logged in</param>
        /// <returns>
        /// A list of challenges that the user has created.
        /// </returns>
        [HttpGet("ByUserName/{Username}")]
        public async Task<IActionResult> GetbyUserName(string Username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserChallenge @user";
            return Ok(await db.QueryAsync<Challenge>(sql, new { user = Username }));

        }

        
        /// <summary>
        /// This function is called when a user wants to join a challenge. It takes the username and
        /// challengeid as parameters and executes the stored procedure JoinChallenge
        /// </summary>
        /// <param name="_username">The username of the user who is joining the challenge</param>
        /// <param name="_challengeid">the id of the challenge</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPost("JoinChallenge/{_username}/{_challengeid}/{_activityid}")]
        public async Task<IActionResult> Join(string _username, int _challengeid, int _activityid)
        {

            var db = dbConnection();
            var sql = @"EXEC JoinChallenge @username, @challengeid, @activityid";
            var result = await db.ExecuteAsync(sql, new { username = _username, challengeid = _challengeid, activityid = _activityid });

            return NoContent();
        }
        /// <summary>
        /// This function is called when a user wants to input an acticity
        /// </summary>
        /// <param name="Activityid">The username of the user who is joining the challenge</param>
        /// <param name="Username">The username of the user who is joining the challenge</param>
        /// <param name="Challengeid">the id of the challenge</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPut("JoinChallenge/InputActivity/{Activityid}/{Challengeid}/{Username}")]
        public async Task<IActionResult> InputActivity(int Activityid, int Challengeid, string Username)
        {
            var db = dbConnection();
            var sql = @"EXEC UpdateJoinChallenge @challengeid, @activityid, @username";
            var result = await db.ExecuteAsync(sql, new { activityid = Activityid, challengeid = Challengeid, username = Username });

            return Ok(result);

        }
        /// <summary>
        /// This function is called when a user wants to exit a challenge. It deletes a row from the database 
        ///where the username and challengeid match the parameters passed in
        /// </summary>
        /// <param name="_username">the username of the user who is exiting the challenge</param>
        /// <param name="_challengeid">the id of the challenge</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ExitChallenge/{_username}/{_challengeid}")]
        public async Task<IActionResult> Exit(string _username, int _challengeid)
        {

            var db = dbConnection();
            var sql = @"EXEC ExitChallenge @username, @challengeid";
            var result = await db.ExecuteAsync(sql, new { username = _username, challengeid = _challengeid });

            return NoContent();
        }
        /// <summary>
        /// This function is used to get all the join challenges from the database
        /// </summary>
        /// <returns>
        /// A list of JoinChallenge objects.
        /// </returns>
        [HttpGet("AllJoinChallenge")]
        public async Task<IActionResult> GetAllJoinChallenge()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllJoinsChallenge";
            return Ok(await db.QueryAsync<JoinChallenge>(sql, new { }));
        }

        /// <summary>
        /// It takes a challengeid and a username and returns a list of numbers that the user has
        /// entered for that challenge
        /// </summary>
        /// <param name="_challengeid">The id of the challenge</param>
        /// <param name="_username">The username of the user who is logged in</param>
        /// <returns>
        /// A list of ChallengeNumbers objects.
        /// </returns>
        [HttpGet("ChallengeNumbers/{_challengeid}/{_username}")]
        public async Task<IActionResult> GetUserNumbers(int _challengeid, string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC GetChallengeNumbers @challengeid, @username";
            return Ok(await db.QueryAsync<ChallengeNumbers>(sql, new { challengeid = _challengeid, username = _username }));
        }
    }
}
