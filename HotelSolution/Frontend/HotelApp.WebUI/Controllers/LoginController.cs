using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using DTO.LoginDTO;
    using EntityLayer.Concrete;
    using Microsoft.AspNetCore.Identity;

    public class LoginController : Controller
    {

        private readonly SignInManager<AppUser> _signInManager;

        public LoginController(SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public async Task<IActionResult> Index(LoginUserDTO loginUserDto)
        {
            if (ModelState.IsValid)
            {
                var result =
                    await _signInManager.PasswordSignInAsync(loginUserDto.Username, loginUserDto.Password, false,
                        false);

                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Staff");
                }

                return View();
            }
            return View();
        }
    }
}