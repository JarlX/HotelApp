using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebAPI.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        [HttpGet]
        public IActionResult RoomList()
        {
            return Ok();
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRoom(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult AddRoom()
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateRoom()
        {
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteRoom()
        {
            return Ok();
        }
    }
}