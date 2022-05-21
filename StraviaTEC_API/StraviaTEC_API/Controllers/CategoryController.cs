using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StraviaTEC_Data;
using StraviaTEC_Models;
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

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllCategories";
            return Ok(await db.QueryAsync<Category>(sql, new { }));
        }
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectCategoryByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Category>(sql, new { name = _name }));

        }

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

