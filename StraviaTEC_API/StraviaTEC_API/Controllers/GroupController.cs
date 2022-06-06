using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private SQLConfig connectionStr;

        public GroupController(SQLConfig connectionString)
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
        /// It's a function that returns a list of strings with group names
        /// </summary>
        /// <returns>
        /// A list of strings with group names.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAllNames()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllGroups";
            return Ok(await db.QueryAsync<string>(sql, new { }));
        }
        /// <summary>
        /// This function is called by the client, and it returns a list of all the groups in the
        /// database
        /// </summary>
        /// <returns>
        /// A list of Group objects.
        /// </returns>
        [HttpGet("AllObjects")]
        public async Task<IActionResult> GetAll()
        {
            var db = dbConnection();
            var sql = @"EXEC SelectAllGroupObjects";
            return Ok(await db.QueryAsync<Group>(sql, new { }));
        }
        /// <summary>
        /// This function is used to get a group by name
        /// </summary>
        /// <param name="_name">The name of the group you want to get.</param>
        /// <returns>
        /// The first or default group with the name that is passed in.
        /// </returns>
        [HttpGet("ByName/{_name}")]
        public async Task<IActionResult> GetbyId(string _name)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectGroupByName @Name = @name";
            return Ok(await db.QueryFirstOrDefaultAsync<Group>(sql, new { name = _name }));

        }

        /// <summary>
        /// It takes a Group object, validates it, and then inserts it into the database
        /// </summary>
        /// <param name="Group">The object that is being passed in.</param>
        /// <returns>
        /// The result of the query is being returned.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Group newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            var result = db.Execute("InsertGroup", newObj, commandType: CommandType.StoredProcedure);

            return Created("created", result > 0);
        }

        /// <summary>
        /// The function takes a Group object as a parameter, and if the object is valid, it updates the
        /// database with the new values
        /// </summary>
        /// <param name="Group">This is the object that is being passed in.</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Group _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var db = dbConnection();
            db.Execute("UpdateGroup", _obj, commandType: CommandType.StoredProcedure);

            return NoContent();
        }

        /// <summary>
        /// This function deletes a group from the database by name
        /// </summary>
        /// <param name="_name">The name of the group to delete</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("ByName/{_name}")]
        public async Task<IActionResult> Delete(string _name)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteGroup @name";
            var result = await db.ExecuteAsync(sql, new { name = _name });

            return NoContent();
        }

        
        /// <summary>
        /// This function takes in a username and a groupname and adds the username to the groupname
        /// </summary>
        /// <param name="_username">the username of the user who is joining the group</param>
        /// <param name="_groupname">The name of the group that the user is trying to join.</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpPost("JoinGroup/{_username}/{_groupname}")]
        public async Task<IActionResult> JoinGroup(string _username, string _groupname)
        {
            var db = dbConnection();
            var sql = @"EXEC JoinGroup  @username, @groupname ";
            var result = await db.ExecuteAsync(sql, new { username = _username, groupname = _groupname });

            return NoContent();
        }
        /// <summary>
        /// This function deletes a member from a group
        /// </summary>
        /// <param name="_groupname">the name of the group</param>
        /// <param name="_username">the username of the user to be deleted</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("GroupMember/{_groupname}/{_username}")]
        public async Task<IActionResult> DeleteMember(string _groupname, string _username)
        {

            var db = dbConnection();
            var sql = @"EXEC DeleteGroupMember @username, @name";
            var result = await db.ExecuteAsync(sql, new { name = _groupname, username = _username });

            return NoContent();
        }
        /// <summary>
        /// This function is used to get all the groups that a manager is in charge of
        /// </summary>
        /// <param name="_username">the username of the manager</param>
        /// <returns>
        /// A list of groups that the manager is in charge of.
        /// </returns>
        [HttpGet("ByManager/{_username}")]
        public async Task<IActionResult> GetGroupByManager(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectGroupByManager  @username ";
            var result = await db.QueryAsync<Group>(sql, new { username = _username });

            return Ok(result);
        }
        /// <summary>
        /// This function is to get all members from a group
        /// </summary>
        /// <param name="_groupname">The name of the group you want to get the members of.</param>
        /// <returns>
        /// A list of GroupMember objects.
        /// </returns>
        [HttpGet("MembersByGroupName/{_groupname}")]
        public async Task<IActionResult> GetGroupMembers(string _groupname)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectGroupMembers @groupname ";
            var result = await db.QueryAsync<GroupMember>(sql, new { groupname = _groupname });

            return Ok(result);
        }
        /// <summary>
        /// This function takes a username as a parameter and returns a list of groups that the user
        /// belongs to
        /// </summary>
        /// <param name="_username">the username of the user you want to get the groups for</param>
        /// <returns>
        /// A list of groups that the user belongs to.
        /// </returns>
        [HttpGet("UserBelongsTo/{_username}")]
        public async Task<IActionResult> GetGroupsbyUser(string _username)
        {
            var db = dbConnection();
            var sql = @"EXEC SelectUserBelongsToGroups  @username ";
            var result = await db.QueryAsync<Group>(sql, new { username = _username });

            return Ok(result);
        }

    }
}
