using Microsoft.AspNetCore.Mvc;
using StraviaTEC_Data.Repositories;
using StraviaTEC_Models;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly IGroup _repository;

        public GroupController(IGroup service)
        {
            _repository = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAll());
        }
        
        [HttpGet("ByName/{Name}")]
        public async Task<IActionResult> GetbyName(string Name)
        {
            return Ok(await _repository.GetbyName(Name));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Group newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.Insert(newObj);

            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Group _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.Update(_obj);

            return NoContent();
        }
        [HttpDelete("ByName/{Name}")]
        public async Task<IActionResult> Delete(string Name)
        {

            await _repository.Delete(new Group { Name = Name });

            return NoContent();
        }

    }
}
