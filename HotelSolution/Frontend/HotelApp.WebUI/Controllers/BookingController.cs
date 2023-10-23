using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.BookingDTO;
    using Newtonsoft.Json;

    public class BookingController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public BookingController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public PartialViewResult AddBooking()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<IActionResult> AddBooking(CreateBookingDTO createBookingDto)
        {
            var jsonSettings = new JsonSerializerSettings
            {
                DateFormatString = "yyyy-MM-dd"
            };
            createBookingDto.Description = " ";
            createBookingDto.Status = "Onay Bekliyor";
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createBookingDto, jsonSettings);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            
            var request = await client.PostAsync("http://localhost:5292/api/AddBooking", stringContent);
            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            
            return View();
        }
    }
}