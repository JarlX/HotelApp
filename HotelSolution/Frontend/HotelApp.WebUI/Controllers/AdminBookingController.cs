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

    public class AdminBookingController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminBookingController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var reservation = await client.GetAsync("http://localhost:5292/api/BookingList");
            
            if (reservation.IsSuccessStatusCode)
            {
                var jsonData = await reservation.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<List<ResultBookingDTO>>(jsonData);
                return View(values);
            }
            return View();
        }
        public async Task<IActionResult> ApproveBooking(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var reservation = await client.PutAsync($"http://localhost:5292/api/ChangeBookingStatusApproved?id="+id,null );
            
            if (reservation.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
        
        public async Task<IActionResult> RejectBooking(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var reservation = await client.PutAsync($"http://localhost:5292/api/ChangeBookingStatusRejected?id="+id,null );
            
            if (reservation.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
        
        public async Task<IActionResult> PendingBooking(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var reservation = await client.PutAsync($"http://localhost:5292/api/ChangeBookingStatusPending?id="+id,null );
            
            if (reservation.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
        
        [HttpGet]
        public async Task<IActionResult> UpdateBooking(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var reservation = await client.GetAsync($"http://localhost:5292/api/GetBooking/{id}");
            
            if (reservation.IsSuccessStatusCode)
            {
                var jsonData = await reservation.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<UpdateBookingDTO>(jsonData);
                return View(values);
            }
            return View();
        }
        
        [HttpPost]
        public async Task<IActionResult> UpdateBooking(UpdateBookingDTO updateBookingDto)
        {

            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateBookingDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PutAsync("http://localhost:3523/api/Booking/UpdateBooking/", stringContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        
    }
    
}