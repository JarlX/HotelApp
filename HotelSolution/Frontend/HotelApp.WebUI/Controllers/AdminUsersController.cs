using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using EntityLayer.Concrete;
    using Microsoft.AspNetCore.Identity;

    public class AdminUsersController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminUsersController(UserManager<AppUser> userManager, HttpClient httpClient, IHttpClientFactory httpClientFactory)
        {
            _userManager = userManager;
            _httpClientFactory = httpClientFactory;
        }

        public async Task <IActionResult> Index()
        {
            return View(_userManager.Users.ToList());
        }
    }
}