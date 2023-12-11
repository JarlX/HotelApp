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
            var staff = _staffService.TGetById(id);
            return Ok(staff);
        }

        [HttpPost]
        public IActionResult AddStaff(Staff staff)
        {
            var firstName = staff.FirstName;
            var lastName = staff.LastName;
            staff.FullName = $"{firstName} {lastName}";
            _staffService.TInsert(staff);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateStaff(Staff staff)
        {
            _staffService.TUpdate(staff);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteStaff(int id)
        {
            var staff = _staffService.TGetById(id);
            _staffService.TDelete(staff);
            return Ok();
        }
        
        [HttpGet]
        public IActionResult GetLast4Staff()
        {
            var staffs = _staffService.TGetLast4Staff();
            return Ok(staffs);
        }
    }
}
