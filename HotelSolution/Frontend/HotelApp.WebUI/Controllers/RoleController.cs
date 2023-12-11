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

    public class RoleController : Controller
    {
        private readonly RoleManager<AppRole> _roleManager;

        public RoleController(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public IActionResult Index()
        {
            var roles = _roleManager.Roles.ToList();
            return View(roles);
        }

        [HttpGet]
        public IActionResult AddRole()
        {
            return View();
        }
        
        [HttpPost]
        public async Task<IActionResult> AddRole(AddRoleViewModel addRoleViewModel)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var appRole = new AppRole()
            {
                Name = addRoleViewModel.RoleName
            };

            var result = await _roleManager.CreateAsync(appRole);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> UpdateRole(int id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());

            if (role == null)
            {
                return RedirectToAction("Index");
            }

            var updateRoleViewModel = new UpdateRoleViewModel()
            {
                RoleID = role.Id,
                RoleName = role.Name
            };

            return View(updateRoleViewModel);
        }
        
        [HttpPost]
        public async Task<IActionResult> UpdateRole(UpdateRoleViewModel updateRoleViewModel)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var role = await _roleManager.Roles.FirstOrDefaultAsync(x => x.Id == updateRoleViewModel.RoleID);

            if (role == null)
            {
                return RedirectToAction("Index");
            }

            role.Name = updateRoleViewModel.RoleName;

            var result = await _roleManager.UpdateAsync(role);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            
            return View();
        }
        
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _roleManager.Roles.FirstOrDefaultAsync(x=> x.Id == id);

            if (role == null)
            {
                return RedirectToAction("Index");
            }

            var result = await _roleManager.DeleteAsync(role);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            
            return RedirectToAction("Index");
        }
        
    }
}