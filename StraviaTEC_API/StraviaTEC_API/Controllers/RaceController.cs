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

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllRaces";
            return Ok(await db.QueryAsync<Race>(sql, new { }));
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
        [HttpGet("ByUserName/{_username}")]
        public async Task<IActionResult> GetbyUserName(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserRace @user";
            return Ok(await db.QueryAsync<Race>(sql, new { user = _username }));

        }

        [HttpPost]
        public async Task<int> Create([FromBody] Race newObj)
        {
            var db = dbConnection();
            //var result = db.Execute("InsertRace", newObj, commandType: CommandType.StoredProcedure);
            int identity = db.ExecuteScalar<int>("InsertRace", newObj, commandType: CommandType.StoredProcedure);
            Console.WriteLine(identity);
            return identity;
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

        //
        [HttpGet("ByUserCategory/{_username}")]
        public async Task<IActionResult> GetbyUserCategory(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceByUserCategory @name";
            return Ok(await db.QueryAsync<Race>(sql, new { name = _username }));

        }
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
        [HttpDelete("ExitRace/{_username}/{_raceid}")]
        public async Task<IActionResult> Exit(string _username, int _raceid)
        {

            var db = dbConnection();
            var sql = @"EXEC ExitRace @username, @raceid";
            var result = await db.ExecuteAsync(sql, new { username = _username, raceid = _raceid });

            return NoContent();
        }
        [HttpGet("PositionList/{_raceid}")]
        public async Task<IActionResult> GetPositionList(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC RacePositionList @raceid";
            return Ok(await db.QueryAsync<PositionList>(sql, new { raceid = _raceid }));
        }
        [HttpPost("AssignRaceSponsor/{_raceid}/{_sponsorid}")]
        public async Task<IActionResult> AssignSponsor(int _raceid, int _sponsorid)
        {

            var db = dbConnection();
            var sql = @"EXEC AssignRaceSponsor @raceid, @sponsorid";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, sponsorid = _sponsorid });

            return Ok(result);
        }
        [HttpDelete("CancelRaceSponsor/{_raceid}/{_sponsorid}")]
        public async Task<IActionResult> CancelSponsor(int _raceid, int _sponsorid)
        {

            var db = dbConnection();
            var sql = @"EXEC CancelRaceSponsor @raceid, @sponsorid";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, sponsorid = _sponsorid });

            return NoContent();
        }
        [HttpGet("Sponsors/ById/{_raceid}")]
        public async Task<IActionResult> GetRaceSponsors(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC RaceSponsors @id";
            return Ok(await db.QueryAsync<RaceSponsors>(sql, new { id = _raceid }));

        }

        [HttpGet("BankAccount/ById/{_raceid}")]
        public async Task<IActionResult> GetRaceAccounts(int _raceid)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectRaceBankAccounts @id";
            return Ok(await db.QueryAsync<BankAccount>(sql, new { id = _raceid }));

        }
        [HttpDelete("BankAccount/{_raceid}/{_account}")]
        public async Task<IActionResult> CancelAccount(int _raceid, int _account)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteRaceBankAccount @raceid, @account";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, account = _account });

            return NoContent();
        }
        [HttpPost("BankAccount/{_raceid}/{_account}")]
        public async Task<IActionResult> AssignAccount(int _raceid, int _account)
        {

            var db = dbConnection();
            var sql = @"EXEC AssignRaceBankAccount @raceid, @account";
            var result = await db.ExecuteAsync(sql, new { raceid = _raceid, account = _account });

            return Ok(result);
        }
    }
}
