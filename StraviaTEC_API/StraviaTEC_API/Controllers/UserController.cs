using Microsoft.AspNetCore.Mvc;
using StraviaTEC_Data.Repositories;
using StraviaTEC_Models;

namespace StraviaTEC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUser _repository;

        public UserController(IUser service)
        {
            _repository = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAll());
        }
        
        [HttpGet("ByUsername/{Username}/{Password}")]
        public async Task<IActionResult> GetbyUsername(string Username, string Password)
        {
            return Ok(await _repository.GetUserDetails(Username, Password));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User newObj)
        {
            if (newObj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _repository.Insert(newObj);

            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User _obj)
        {
            if (_obj == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.Update(_obj);

            return NoContent();
        }
        [HttpDelete("ByUsername/{Username}/{Password}")]
        public async Task<IActionResult> Delete(string Username, string Password)
        {

            await _repository.Delete(new User { username = Username, password = Password });

            return NoContent();
        }
    }
}
