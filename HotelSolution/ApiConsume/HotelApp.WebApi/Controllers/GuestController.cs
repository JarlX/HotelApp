using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using BusinessLayer.Abstract;
    using EntityLayer.Concrete;

    [Route("api/[action]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly IGuestService _guestService;

        public GuestController(IGuestService guestService)
        {
            _guestService = guestService;
        }

        [HttpGet]
        public IActionResult GetGuests()
        {
            var guests = _guestService.TGetList();
            return Ok(guests);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetGuest(int id)
        {
           var guest =  _guestService.TGetById(id);
            return Ok(guest);
        }

        [HttpPost]
        public IActionResult AddGuest(Guest guest)
        {
            _guestService.TInsert(guest);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateGuest(Guest guest)
        {
            _guestService.TUpdate(guest);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteGuest(int id)
        {
            var guest = _guestService.TGetById(id);
            _guestService.TDelete(guest);
            return Ok();
        }
    }
}
