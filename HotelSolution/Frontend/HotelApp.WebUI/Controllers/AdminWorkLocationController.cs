using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.WorkLocationDTO;
    using Newtonsoft.Json;

    public class AdminWorkLocationController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminWorkLocationController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/GetWorkLocationList");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var workLocations = JsonConvert.DeserializeObject<List<ResultWorkLocationDTO>>(jsonData);
                return View(workLocations);
            }
            return View();
        }
        
        [HttpGet]
        public IActionResult AddWorkLocation()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddWorkLocation(CreateWorkLocationDTO createWorkLocationDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createWorkLocationDto);

            StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
            var request = await client.PostAsync("http://localhost:5292/api/AddWorkLocation", stringContent);

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> UpdateWorkLocation(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"http://localhost:5292/api/GetWorkLocation/{id}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var workLocation = JsonConvert.DeserializeObject<UpdateWorkLocationDTO>(jsonData);
                return View(workLocation);
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateWorkLocation(UpdateWorkLocationDTO updateWorkLocationDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateWorkLocationDto);

            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var request = await client.PostAsync($"http://localhost:5292/api/WorkLocation/UpdateWorkLocation", stringContent);

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteWorkLocation(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var request = await client.DeleteAsync($"http://localhost:5292/api/WorkLocation/DeleteWorkLocation/{id}");

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }
        
    }
}