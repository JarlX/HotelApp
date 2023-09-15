using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebAPI.Controllers
{
    using BusinessLayer.Abstract;
    using EntityLayer.Concrete;

    [Route("api/[action]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public IActionResult RoomList()
        {
            var rooms = _roomService.TGetList();
            return Ok(rooms);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRoom(int id)
        {
            var room = _roomService.TGetById(id);
            return Ok(room);
        }

        [HttpPost]
        public IActionResult AddRoom(Room room)
        {
            _roomService.TInsert(room);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateRoom(Room room)
        {
            _roomService.TUpdate(room);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteRoom(int id)
        {
            var room = _roomService.TGetById(id);
            _roomService.TDelete(room);
            return Ok();
        }
    }

}