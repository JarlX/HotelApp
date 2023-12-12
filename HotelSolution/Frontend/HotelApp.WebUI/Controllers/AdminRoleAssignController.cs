using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using EntityLayer.Concrete;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Models.Role;

    public class AdminRoleAssignController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public AdminRoleAssignController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public IActionResult Index()
        {
            var values = _userManager.Users.ToList();
            return View(values);
        }

        [HttpGet]
        public async Task<IActionResult> AssignRole(int id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            TempData["UserId"] = user.Id;
            var roles =  _roleManager.Roles.ToList();
            var userRoles = await _userManager.GetRolesAsync(user);
            List<RoleAssignViewModel> roleAssignViewModels = new List<RoleAssignViewModel>();
            foreach (var role in roles)
            {
                var roleAssignViewModel = new RoleAssignViewModel()
                {
                    RoleID = role.Id,
                    RoleName = role.Name,
                    RoleExist = userRoles.Contains(role.Name)
                };
                roleAssignViewModels.Add(roleAssignViewModel);
            }

            return View(roleAssignViewModels);
        }
        
        [HttpPost]
        public async Task<IActionResult> AssignRole(List<RoleAssignViewModel> roleAssignViewModels)
        {
            var userId = (int) TempData["UserId"];
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            foreach (var roleAssignViewModel in roleAssignViewModels)
            {
                if (roleAssignViewModel.RoleExist)
                {
                    await _userManager.AddToRoleAsync(user, roleAssignViewModel.RoleName);
                }
                else
                {
                    await _userManager.RemoveFromRoleAsync(user, roleAssignViewModel.RoleName);
                }
            }

            return RedirectToAction("Index");
        }
        
    }
}