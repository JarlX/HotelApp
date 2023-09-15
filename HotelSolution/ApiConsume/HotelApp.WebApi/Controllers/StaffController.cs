using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using BusinessLayer.Abstract;

    [Route("api/[action]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;

        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet]
        public IActionResult StaffList()
        {
            var staffs = _staffService.TGetList();
            return Ok(staffs);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetStaff(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult AddStaff()
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateStaff()
        {
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteStaff()
        {
            return Ok();
        }
    }
}
