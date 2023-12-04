using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.ContactDTO;
    using DTO.MessageCategoryDTO;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Newtonsoft.Json;

    [AllowAnonymous]
    public class ContactController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ContactController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/GetMessageCategories");

            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<ResultMessageCategoryDTO>>(jsonData);

            List<SelectListItem> dropDownList = (from i in values
                select new SelectListItem
                {
                    Text = i.MessageCateegoryName,
                    Value = i.MessageCategoryID.ToString()
                }).ToList();
            
            ViewBag.dropDownList = dropDownList;
            
            return View();
        }

        [HttpGet]
        public PartialViewResult AddContact()
        {
            return PartialView();
        }
        
        [HttpPost]
        public async Task<IActionResult> AddContact(CreateContactDTO createContactDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createContactDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            
            var request = await client.PostAsync("http://localhost:5292/api/AddContact", stringContent);

            if (request.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
    }
}