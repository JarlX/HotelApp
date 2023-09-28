using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using AutoMapper;
    using DTO.ServiceDTO;
    using Newtonsoft.Json;

    public class ServiceController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMapper _mapper;

        public ServiceController(IHttpClientFactory httpClientFactory, IMapper mapper)
        {
            _httpClientFactory = httpClientFactory;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            var client = _httpClientFactory.CreateClient();
            var services = await client.GetAsync("http://localhost:5292/api/ServiceList");
            if (services.IsSuccessStatusCode)
            {
                var jsonData = await services.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<List<ResultServiceDTO>>(jsonData);
                return View(values);
            }

            return View();
        }
    }
}