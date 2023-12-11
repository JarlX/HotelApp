using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using DTO.RegisterDTO;
    using EntityLayer.Concrete;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;

    [AllowAnonymous]
    public class RegisterController : Controller
    {
        private readonly UserManager<AppUser> _userManager;

        public RegisterController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(CreateNewUserDTO createNewUserDto)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }
            var appUser = new AppUser()
            {
                Name = createNewUserDto.Name,
                Email = createNewUserDto.Mail,
                SurName = createNewUserDto.Surname,
                UserName = createNewUserDto.Username,
                City = "",
                Country = "",
                WorkLocationID = 7,
                ImageUrl = "",
                WorkDepartment = ""
            };

            var result = await _userManager.CreateAsync(appUser, createNewUserDto.Password);

            if (result.Succeeded)
            {
                return RedirectToAction("Index","Login");
            }
            
            return View();
        }

    }
}