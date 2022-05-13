using Microsoft.AspNetCore.Mvc;
using StraviaTEC_Data.Repositories;
using StraviaTEC_Models;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceController : Controller
    {
        private readonly IRace _repository;

        public RaceController(IRace service)
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
        [HttpGet("ByName/{Name}")]
        public async Task<IActionResult> GetbyName(string Name)
        {
            return Ok(await _repository.GetbyName(Name));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Race newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.Insert(newObj);

            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Race _obj)
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

            await _repository.Delete(new Race { id = ID });

            return NoContent();
        }
    }
}
