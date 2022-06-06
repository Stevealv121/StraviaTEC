using Microsoft.AspNetCore.Mvc;
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
        /// It's a GET function that returns a list of all races in the database
        /// </summary>
        /// <returns>
        /// A list of races.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllRaces";
            return Ok(await db.QueryAsync<Race>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a race by its ID
        /// </summary>
        /// <param name="ID">The ID of the race you want to get</param>
        /// <returns>
        /// The first or default race that matches the ID.
        /// </returns>
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Race>(sql, new { id = ID }));

        }
        /// <summary>
        /// This function is used to get a race by name
        /// </summary>
        /// <param name="_name">The name of the race you want to get.</param>
        /// <returns>
        /// A single Race object
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Race>(sql, new { name = _name }));

        }
        /// <summary>
        /// This function is used to get all the races that a user is in charge of
        /// </summary>
        /// <param name="_username">the username of the user</param>
        /// <returns>
        /// A list of races that the user is in charge of.
        /// </returns>
        [HttpGet("ByUserName/{_username}")]
        public async Task<IActionResult> GetbyUserName(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserRace @user";
            return Ok(await db.QueryAsync<Race>(sql, new { user = _username }));

        }
        /// <summary>
        /// This function returns a list of races that a user has joined
        /// </summary>
        /// <param name="_username">the username of the user you want to get the races for</param>
        /// <returns>
        /// A list of races that the user belongs to.
        /// </returns>
        [HttpGet("UserJoins/{_username}")]
        public async Task<IActionResult> GetRacesbyUser(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserBelongsToRace  @username ";
            var result = await db.QueryAsync<Race>(sql, new { username = _username });

            return Ok(result);
        }
        /// <summary>
        /// The function takes a Race object as a parameter, and returns the identity of the newly
        /// created Race object
        /// </summary>
        /// <param name="Race"></param>
        /// <returns>
        /// The identity of the new record.
        /// </returns>
        [HttpPost]
        public async Task<int> Create([FromBody] Race newObj)
        {
            var db = dbConnection();
            //var result = db.Execute("InsertRace", newObj, commandType: CommandType.StoredProcedure);
            int identity = db.ExecuteScalar<int>("InsertRace", newObj, commandType: CommandType.StoredProcedure);
            Console.WriteLine(identity);
            return identity;
        }

        /// <summary>
        /// The function takes a Race object as a parameter, and if the object is valid, it updates the
        /// database with the new values
        /// </summary>
        /// <param name="Race">This is the object that is being passed in.</param>
        /// <returns>
        /// NoContent()
        /// </returns>
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

        /// <summary>
        /// This function deletes a race from the database
        /// </summary>
        /// <param name="ID">The ID of the race to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"DeleteRace @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }

        
        /// <summary>
        /// This function is used to get all the races that a user has available
        /// </summary>
        /// <param name="_username">the username of the user</param>
        /// <returns>
        /// A list of races that the user can participate in.
        /// </returns>
        [HttpGet("ByUserCategory/{_username}")]
        public async Task<IActionResult> GetbyUserCategory(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceByUserCategory @name";
            return Ok(await db.QueryAsync<Race>(sql, new { name = _username }));

        }
        /// <summary>
        /// This function takes in JoinRace and adds the username to the race
        /// </summary>
        /// <param name="JoinRace">This is the information to join a race</param>
        /// <returns>
        /// The result of the stored procedure.
        /// </returns>
        [HttpPost("JoinRace")]
        public async Task<IActionResult> Join([FromBody] JoinRace newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("JoinRace", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
            
        }
        /// <summary>
        /// This function is used to update the activityid of a user in a race
        /// </summary>
        /// <param name="_activityid">the id of the activity that the user has inputted</param>
        /// <param name="_raceid">the id of the race</param>
        /// <param name="_username">the username of the user who is joining the race</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
        [HttpPut("JoinRace/InputActivity/{_activityid}/{_raceid}/{_username}")]
        public async Task<IActionResult> InputActivity(int _activityid, int _raceid, string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC UpdateJoinRace @raceid, @activityid, @username";
            var result = await db.ExecuteAsync(sql, new { activityid = _activityid, raceid = _raceid, username = _username });

            return Ok(result);

        }
        /// <summary>
        /// This function is called when a user wants to exit a race
        /// </summary>
        /// <param name="_username">the username of the user who is exiting the race</param>
        /// <param name="_raceid">the id of the race</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ExitRace/{_username}/{_raceid}")]
        public async Task<IActionResult> Exit(string _username, int _raceid)
        {

            var db = dbConnection();
            var sql = @"EXEC ExitRace @username, @raceid";
            var result = await db.ExecuteAsync(sql, new { username = _username, raceid = _raceid });

            return NoContent();
        }
        /// <summary>
        /// It returns a list of positions for a given race
        /// </summary>
        /// <param name="_raceid">The race id</param>
        /// <returns>
        /// A list of PositionList objects.
        /// </returns>
        [HttpGet("PositionList/{_raceid}")]
        public async Task<IActionResult> GetPositionList(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC RacePositionList @raceid";
            return Ok(await db.QueryAsync<PositionList>(sql, new { raceid = _raceid }));
        }
        /// <summary>
        /// This function is called by the front end to assign a sponsor to a race
        /// </summary>
        /// <param name="_raceid">The id of the race you want to assign a sponsor to</param>
        /// <param name="_sponsorid">Sponsor id</param>
        /// <returns>
        /// The result of the query.
        /// </returns>
        [HttpPost("AssignRaceSponsor/{_raceid}/{_sponsorid}")]
        public async Task<IActionResult> AssignSponsor(int _raceid, int _sponsorid)
        {

            var db = dbConnection();
            var sql = @"EXEC AssignRaceSponsor @raceid, @sponsorid";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, sponsorid = _sponsorid });

            return Ok(result);
        }
        /// <summary>
        /// This function deletes a record from the RaceSponsor table
        /// </summary>
        /// <param name="_raceid">int</param>
        /// <param name="_sponsorid">1</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("CancelRaceSponsor/{_raceid}/{_sponsorid}")]
        public async Task<IActionResult> CancelSponsor(int _raceid, int _sponsorid)
        {

            var db = dbConnection();
            var sql = @"EXEC CancelRaceSponsor @raceid, @sponsorid";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, sponsorid = _sponsorid });

            return NoContent();
        }
        /// <summary>
        /// This function returns a list of sponsors for a given race
        /// </summary>
        /// <param name="_raceid">The id of the race you want to get the sponsors for.</param>
        /// <returns>
        /// A list of RaceSponsors
        /// </returns>
        [HttpGet("Sponsors/ById/{_raceid}")]
        public async Task<IActionResult> GetRaceSponsors(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC RaceSponsors @id";
            return Ok(await db.QueryAsync<RaceSponsors>(sql, new { id = _raceid }));

        }

        /// <summary>
        /// It takes a race id, and returns a list of bank accounts associated with that race
        /// </summary>
        /// <param name="_raceid">The id of the race</param>
        /// <returns>
        /// A list of BankAccounts
        /// </returns>
        [HttpGet("BankAccount/ById/{_raceid}")]
        public async Task<IActionResult> GetRaceAccounts(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceBankAccounts @id";
            return Ok(await db.QueryAsync<BankAccount>(sql, new { id = _raceid }));

        }
        /// <summary>
        /// This function deletes a bank account from the database
        /// </summary>
        /// <param name="_raceid">int</param>
        /// <param name="_account">int</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("BankAccount/{_raceid}/{_account}")]
        public async Task<IActionResult> CancelAccount(int _raceid, int _account)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteRaceBankAccount @raceid, @account";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, account = _account });

            return NoContent();
        }
        /// <summary>
        /// This function is called by the front end to assign a bank account to a race
        /// </summary>
        /// <param name="_raceid">The id of the race</param>
        /// <param name="_account">int</param>
        /// <returns>
        /// The result of the stored procedure.
        /// </returns>
        [HttpPost("BankAccount/{_raceid}/{_account}")]
        public async Task<IActionResult> AssignAccount(int _raceid, int _account)
        {

            var db = dbConnection();
            var sql = @"EXEC AssignRaceBankAccount @raceid, @account";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, account = _account });

            return Ok(result);
        }
        /// <summary>
        /// This function is used to get all the join race data from the database
        /// </summary>
        /// <returns>
        /// A list of JoinRace objects.
        /// </returns>
        [HttpGet("AllJoinRace")]
        public async Task<IActionResult> GetAllJoinRace()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllJoinsRace";
            return Ok(await db.QueryAsync<JoinRace>(sql, new { }));
        }
    }
}
