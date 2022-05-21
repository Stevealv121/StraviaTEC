using Microsoft.AspNetCore.Mvc;
using StraviaTEC_Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;
namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : Controller
    {
        private SQLConfig connectionStr;

        public SponsorController(SQLConfig connectionString)
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
            var sql = @"EXEC SelectAllSponsors";
            return Ok(await db.QueryAsync<Sponsor>(sql, new { }));
        }
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSponsorById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { id = ID }));

        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSponsorByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { name = _name }));

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sponsor newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertSponsor", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Sponsor _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateSponsor", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"DeleteSponsor @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }
    }
}
