using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StraviaTEC_Data.Repositories;
using System.Data;
using System.Data.SqlClient;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : Controller
    {
        private readonly IActivity _activityService;

        public ActivityController(IActivity activityService)
        {
            _activityService = activityService;
        }
       
        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            return Ok(await _activityService.GetAllActivities());
        }
    }
}
