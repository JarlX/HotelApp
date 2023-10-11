using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.ServiceDTO;
    using Newtonsoft.Json;

    public class ServiceController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ServiceController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var services = await client.GetAsync("http://localhost:5292/api/ServiceList");
            if (services.IsSuccessStatusCode)
            {
                var jsonData = await services.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<List<ResultServiceDTO>>(jsonData);
                return View(values);
            }

            return View();
        }

        [HttpGet]
        public IActionResult AddService()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddService(CreateServiceDTO createServiceDto)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createServiceDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var request = await client.PostAsync("http://localhost:5292/api/AddService", stringContent);

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();

        }
        
        public async Task<IActionResult> DeleteService(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.DeleteAsync($"http://localhost:5292/api/DeleteService/{id}");

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        [HttpGet]
        public async Task<IActionResult> UpdateService(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"http://localhost:5292/api/GetService/{id}");
            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var service = JsonConvert.DeserializeObject<UpdateServiceDTO>(jsonData);
                return View(service);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateService(UpdateServiceDTO updateServiceDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateServiceDto);
            StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
            var response = await client.PutAsync($"http://localhost:5292/api/UpdateService/",
                stringContent);
        
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }
    }
}