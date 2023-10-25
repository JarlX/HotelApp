using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RapidAPI.Controllers
{
    using Models;
    using Newtonsoft.Json;

    public class ExchangeController : Controller
    {
        public async Task<IActionResult> Index()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?currency=AED&locale=en-gb"),
                Headers =
                {
                    { "X-RapidAPI-Key", "f8fcd6953bmsh67e5a9359eeca61p10787cjsnc08196175f03" },
                    { "X-RapidAPI-Host", "booking-com.p.rapidapi.com" },
                },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                var exchangeViewModels = JsonConvert.DeserializeObject<ExchangeViewModel>(body);
                return View(exchangeViewModels.exchange_rates.ToList());

            }
        }
    }
}