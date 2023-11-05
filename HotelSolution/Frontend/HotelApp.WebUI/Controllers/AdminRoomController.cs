using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.RoomDTO;
    using Newtonsoft.Json;

    public class AdminRoomController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminRoomController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/RoomList");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var room = JsonConvert.DeserializeObject<List<RoomResultDTO>>(jsonData);
                return View(room);
            }
            return View();
        }
        
        [HttpGet]
        public IActionResult AddRoom()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomCreateDTO roomCreateDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(roomCreateDto);

            StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
            var response = await client.PostAsync("http://localhost:5292/api/AddRoom",stringContent);
            
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> UpdateRoom(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"http://localhost:5292/api/GetRoom/{id}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var room = JsonConvert.DeserializeObject<RoomUpdateDTO>(jsonData);
                return View(room);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRoom(RoomUpdateDTO roomUpdateDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(roomUpdateDto);
            StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
            var request = await client.PutAsync("http://localhost:5292/api/UpdateRoom", stringContent);

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }

            return View();
        }

        
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.DeleteAsync($"http://localhost:5292/api/DeleteRoom/{id}");

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
    }
}