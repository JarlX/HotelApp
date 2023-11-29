using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.NewsletterDTO;
    using Microsoft.AspNetCore.Authorization;
    using Newtonsoft.Json;

    [AllowAnonymous]
    public class DefaultController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DefaultController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public PartialViewResult _NewsletterPartial()
        {
            return PartialView();
        }
        
        [HttpPost]
        public async Task<IActionResult> _NewsletterPartial(CreateNewsletterDTO createNewsletterDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createNewsletterDto);
            StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
            
            var response = await client.PostAsync("http://localhost:5292/api/AddSubscribe",stringContent);

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index","Default");

            }
            return View();
        }
    }
}