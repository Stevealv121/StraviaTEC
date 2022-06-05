using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;
namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private SQLConfig connectionStr;

        public CategoryController(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }
        /// <summary>
        /// It returns a new SqlConnection object, using the connection string stored in the connectionStr
        /// object.
        /// </summary>
        /// <returns>
        /// A new instance of the SqlConnection class.
        /// </returns>
        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        /// <summary>
        /// It's a function that returns a list of strings with category names from the database
        /// </summary>
        /// <returns>
        /// A list of strings with category names.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllCategories";
            return Ok(await db.QueryAsync<string>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a category by name
        /// </summary>
        /// <param name="_name">The name of the category you want to get.</param>
        /// <returns>
        /// The first or default category that matches the name.
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectCategoryByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Category>(sql, new { name = _name }));

        }

        /// <summary>
        /// It takes a JSON Category object from the body of the request, and then inserts it into the database
        /// </summary>
        /// <param name="Category">The model class</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertCategory", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        /// <summary>
        /// The above function is used to update the category details
        /// </summary>
        /// <param name="Category">The model class</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Category _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateCategory", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        /// <summary>
        /// This function deletes a category from the database by name
        /// </summary>
        /// <param name="_name">The name of the category to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ByName/{_name}")]
        public async Task<IActionResult> Delete(string _name)
        {

            var db = dbConnection();
            var sql = @"DeleteCategory @Name = @name";
            var result = await db.ExecuteAsync(sql, new { name = _name });

            return NoContent();
        }
    }
}

