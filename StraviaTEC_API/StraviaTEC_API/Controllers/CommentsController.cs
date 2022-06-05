using Comments_API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Comments_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly CommentsService _commentsService;

        public CommentsController(CommentsService commentsService)
        {
            _commentsService = commentsService;
        }
        /// <summary>
        /// It returns a list of all comments in the database
        /// </summary>
        /// <returns>
        /// A list of comments.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            return Ok(await _commentsService.GetAllComments());
        }
        /// <summary>
        /// This function returns a list of comments for a specific activity
        /// </summary>
        /// <param name="activity_ID">The ID of the activity that the comments are associated
        /// with.</param>
        /// <returns>
        /// A list of comments for a specific activity.
        /// </returns>
        [HttpGet("Activity/{activity_ID}")]
        public async Task<IActionResult> GetActivityComments(int activity_ID)
        {
            return Ok(await _commentsService.GetActivityComments(activity_ID));
        }
        /// <summary>
        /// It takes a comment object from the body of the request, validates it, and then inserts it
        /// into the database
        /// </summary>
        /// <param name="Comment"></param>
        /// <returns>
        /// The result of the action.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] Comment newComment)
        {
            if (newComment == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _commentsService.InsertComment(newComment);

            return Ok();
        }
        /// <summary>
        /// This function deletes a comment from the database
        /// </summary>
        /// <param name="ID">The ActivityID of the comment to be deleted</param>
        /// <returns>
        /// NoContent()
        /// </returns>
        [HttpDelete("Activity/{ID}")]
        public async Task<IActionResult> DeleteComment(int ID)
        {

            await _commentsService.DeleteComment(ID);

            return NoContent();
        }
    }
}
