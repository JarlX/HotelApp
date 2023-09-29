using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using BusinessLayer.Abstract;
    using EntityLayer.Concrete;

    [Route("api/[action]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public IActionResult ServiceList()
        {
            var services = _serviceService.TGetList();
            return Ok(services);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetService(int id)
        {
            var service = _serviceService.TGetById(id);
            return Ok(service);
        }

        [HttpPost]
        public IActionResult AddService(Service service)
        {
            _serviceService.TInsert(service);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateService(Service service)
        {
            _serviceService.TUpdate(service);
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteService(int id)
        {
            var service = _serviceService.TGetById(id);
            _serviceService.TDelete(service);
            return Ok();
        }
    }

}
