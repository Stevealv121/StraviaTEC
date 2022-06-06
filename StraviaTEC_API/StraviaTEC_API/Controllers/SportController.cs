using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportController : Controller
    {
        private SQLConfig connectionStr;

        public SportController(SQLConfig connectionString)
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
        /// It's a GET function that returns a list of all sports in the database
        /// </summary>
        /// <returns>
        /// A list of strings with sport names.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllSports";
            return Ok(await db.QueryAsync<string>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a sport by its name
        /// </summary>
        /// <param name="_name">The name of the sport you want to get.</param>
        /// <returns>
        /// The first or default sport with the name that is passed in.
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectSportByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Sport>(sql, new { name = _name }));

        }

        /// <summary>
        /// It takes a Sport object, validates it, and then inserts it into the database
        /// </summary>
        /// <param name="Sport">The object that is being passed in.</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sport newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertSport", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        /// <summary>
        /// The above function is used to update a sport in the database
        /// </summary>
        /// <param name="Sport">This is the sport to update</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Sport _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateSport", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        /// <summary>
        /// This function deletes a sport from the database by name
        /// </summary>
        /// <param name="_name">The name of the sport to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ByName/{_name}")]
        public async Task<IActionResult> Delete(string _name)
        {

            var db = dbConnection();
            var sql = @"DeleteSport @Name = @name";
            var result = await db.ExecuteAsync(sql, new { name = _name });

            return NoContent();
        }
    }
}
