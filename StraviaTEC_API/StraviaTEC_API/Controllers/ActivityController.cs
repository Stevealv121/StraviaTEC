using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;
namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class ActivityController : Controller
    {
        
        private SQLConfig connectionStr;

      
        public ActivityController(SQLConfig connectionString)
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
        /// It's a GET function that returns a list of all activities in the database
        /// </summary>
        /// <returns>
        /// A list of activities.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllActivities";
            return Ok(await db.QueryAsync<Activity>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a single activity by its ID
        /// </summary>
        /// <param name="ID">The ID of the activity you want to get.</param>
        /// <returns>
        /// The first or default activity that matches the ID.
        /// </returns>
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectActivityById @Id = @id";
            return Ok(await db.QueryFirstOrDefaultAsync<Activity>(sql, new { id = ID }));
            
        }
        
        /// <summary>
        /// It takes a JSON Activity object from the body of the request, and inserts it into the database
        /// </summary>
        /// <param name="Activity">This is the object that is being passed in.</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Activity newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertActivity", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result>0);
        }
        
        /// <summary>
        /// The function takes in an object of type Activity, and if the object is not null, and the
        /// model state is valid, then it will execute the stored procedure UpdateActivity
        /// </summary>
        /// <param name="Activity">This is the object that is being passed in.</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Activity _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateActivity", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }
        
       /// <summary>
       /// This function deletes an activity from the database
       /// </summary>
       /// <param name="ID">The ID of the activity to delete</param>
       /// <returns>
       /// NoContent()
       /// </returns>
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            var db = dbConnection();
            var sql = @"DeleteActivity @Id = @_id";
            var result = await db.ExecuteAsync(sql, new { _id = ID });

            return NoContent();
        }

       /// <summary>
       /// This function is used to get all the activities of a user
       /// </summary>
       /// <param name="_username">the username of the user whose activities you want to
       /// retrieve</param>
       /// <returns>
       /// A list of activities
       /// </returns>
        [HttpGet("ByUserName/{_username}")]
        public async Task<IActionResult> GetbyUserName(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserActivities @user";
            return Ok(await db.QueryAsync<Activity>(sql, new { user = _username }));

        }
    }
}
