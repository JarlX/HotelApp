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
    public class WorkLocationController : ControllerBase
    {
        private readonly IWorkLocationService _workLocationService;

        public WorkLocationController(IWorkLocationService workLocationService)
        {
            _workLocationService = workLocationService;
        }

        [HttpGet]
        public ActionResult GetWorkLocationList()
        {
            var workLocations = _workLocationService.TGetList();
            return Ok(workLocations);
        }

        [HttpGet("{id:int}")]
        public ActionResult GetWorkLocation(int id)
        {
            var workLocation = _workLocationService.TGetById(id);
            return Ok(workLocation);
        }

        [HttpPost]
        public ActionResult AddWorkLocation(WorkLocation workLocation)
        {
            _workLocationService.TInsert(workLocation);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateWorkLocation(WorkLocation workLocation)
        {
            _workLocationService.TUpdate(workLocation);
            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteWorkLocation(int id)
        {
            var workLocation = _workLocationService.TGetById(id);
            _workLocationService.TDelete(workLocation);
            return Ok();
        }
    }
}
