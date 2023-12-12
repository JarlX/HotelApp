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
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        
        [HttpGet]
        public IActionResult BookingList()
        {
            var bookings = _bookingService.TGetList();
            return Ok(bookings);
        }
        
        [HttpGet("{id:int}")]
        public IActionResult GetBooking(int id)
        {
            var booking = _bookingService.TGetById(id);
            return Ok(booking);
        }
        
        [HttpPost]
        public IActionResult AddBooking(Booking booking)
        {
            _bookingService.TInsert(booking);
            return Ok();
        }
        
        [HttpPut]
        public IActionResult UpdateBooking(Booking booking)
        {
            _bookingService.TUpdate(booking);
            return Ok();
        }
        
        [HttpDelete]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _bookingService.TGetById(id);
            _bookingService.TDelete(booking);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetLast6Booking()
        {
            var last6 = _bookingService.TGetLast6Booking();
            return Ok(last6);
        }
        
        [HttpPut]
        public IActionResult ChangeBookingStatusApproved(int id)
        {
            _bookingService.TChangeBookingStatusApproved(id);
            return Ok();
        }
        
        [HttpPut]
        public IActionResult ChangeBookingStatusRejected(int id)
        {
            _bookingService.TChangeBookingStatusRejected(id);
            return Ok();
        }
        
        [HttpPut]
        public IActionResult ChangeBookingStatusPending(int id)
        {
            _bookingService.TChangeBookingStatusPending(id);
            return Ok();
        }
        
    }
}
