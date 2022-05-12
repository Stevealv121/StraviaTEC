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
        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            return Ok(await _commentsService.GetAllComments());
        }
        [HttpGet("Activity/{activity_ID}")]
        public async Task<IActionResult> GetActivityComments(int activity_ID)
        {
            return Ok(await _commentsService.GetActivityComments(activity_ID));
        }
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
        [HttpDelete("{ID}")]
        public async Task<IActionResult> DeleteComment(int ID)
        {

            await _commentsService.DeleteComment(ID);

            return NoContent();
        }
    }
}
