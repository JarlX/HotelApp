
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using BusinessLayer.Abstract;


    [Route("api/[action]")]
    [ApiController]
    public class DasboardWidgetController : ControllerBase
    {
        private readonly IStaffService _staffService;
        private readonly IBookingService _bookingService;
        private readonly IAppUserService _appUserService;
        private readonly IRoomService _roomService;

        public DasboardWidgetController(IStaffService staffService, IBookingService bookingService, IAppUserService appUserService, IRoomService roomService)
        {
            _staffService = staffService;
            _bookingService = bookingService;
            _appUserService = appUserService;
            _roomService = roomService;
        }
        
        [HttpGet]
        public IActionResult GetStaffCount()
        {
            var staffCount = _staffService.TGetStaffCount();
            return Ok(staffCount);
        }
        
        [HttpGet]
        public IActionResult GetBookingCount()
        {
            var bookingCount = _bookingService.TGetBookingCount();
            return Ok(bookingCount);
        }
        
        [HttpGet]
        public IActionResult GetUsersCount()
        {
            var usersCount = _appUserService.TGetAppUserCount();
            return Ok(usersCount);
        }
        
        [HttpGet]
        public IActionResult GetRoomCount()
        {
            var roomCount = _roomService.TGetRoomCount();
            return Ok(roomCount);
        }
    }
}
