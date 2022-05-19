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

        public ActivityController(IActivity service)
        {
            _repository = service;
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
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Activity newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.Insert(newObj);

            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Activity _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.Update(_obj);

            return NoContent();
        }
        [HttpDelete("ById/{ID}")]
        public async Task<IActionResult> Delete(int ID)
        {

            await _repository.Delete(new Activity { Id = ID });

            return NoContent();
        }
    }
}
