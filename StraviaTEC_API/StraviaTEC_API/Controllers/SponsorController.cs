using Microsoft.AspNetCore.Mvc;
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

        /// <summary>
        /// It returns a new SqlConnection object, which is initialized with the connection string that
        /// is stored in the connectionStr object
        /// </summary>
        /// <returns>
        /// A new instance of the SqlConnection class.
        /// </returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        /// <summary>
        /// It's a GET function that returns a list of all sponsors in the database
        /// </summary>
        /// <returns>
        /// A list of sponsors.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllSponsors";
            return Ok(await db.QueryAsync<Sponsor>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a single sponsor by their ID
        /// </summary>
        /// <param name="ID">The ID of the sponsor you want to get.</param>
        /// <returns>
        /// The first or default sponsor from the database.
        /// </returns>
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSponsorById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { id = ID }));

        }
        /// <summary>
        /// This function is used to get a single sponsor by name
        /// </summary>
        /// <param name="_name">The name of the sponsor you want to search for.</param>
        /// <returns>
        /// The first or default sponsor with the name that is passed in.
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSponsorByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { name = _name }));

        }

        /// <summary>
        /// It takes a Sponsor object, validates it, and then inserts it into the database
        /// </summary>
        /// <param name="Sponsor">The object that is being passed in</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
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

        /// <summary>
        /// It updates a sponsor in the database
        /// </summary>
        /// <param name="Sponsor"></param>
        /// <returns>
        /// NoContent()
        /// </returns>
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

        /// <summary>
        /// This function deletes a sponsor from the database
        /// </summary>
        /// <param name="ID">The ID of the sponsor to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
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
