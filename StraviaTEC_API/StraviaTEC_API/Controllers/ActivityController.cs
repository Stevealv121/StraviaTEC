using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StraviaTEC_Data.Repositories;
using StraviaTEC_Models;
using System.Data;
using System.Data.SqlClient;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : Controller
    {
        private readonly IActivity _repository;

        public ActivityController(IActivity activityService)
        {
            _repository = activityService;
        }
       
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAll());
        }
        [HttpGet("ById/{ID}")]
        public async Task<IActionResult> GetbyId(int ID)
        {
            return Ok(await _repository.GetbyId(ID));
        }
        [HttpGet("ByName/{Name}")]
        public async Task<IActionResult> GetbyName(string Name)
        {
            return Ok(await _repository.GetbyName(Name));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Activity newActivity)
        {
            if (newActivity == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.Insert(newActivity);

            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Activity _activity)
        {
            if (_activity == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.Update(_activity);

            return NoContent();
        }
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> DeleteAirplane(int ID)
        {

            await _repository.Delete(new Activity { id = ID });

            return NoContent();
        }
    }
}
