using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using DTO.AppUserDTO;
    using EntityLayer.Concrete;
    using Microsoft.AspNetCore.Identity;
    using Newtonsoft.Json;


    public class AdminUsersController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminUsersController(UserManager<AppUser> userManager, HttpClient httpClient, IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/UserListWithWorkLocation");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var users = JsonConvert.DeserializeObject<List<ResultAppUserDTO>>(jsonData);
                return View(users);
            }

            return View();
        }
    }
}