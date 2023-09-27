using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using Models.Testimonial;
    using Newtonsoft.Json;

    public class TestimonialController : Controller
    {
     
          private readonly IHttpClientFactory _httpClientFactory;

    public TestimonialController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IActionResult> Index()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:5292/api/TestimonialList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var testimonial = JsonConvert.DeserializeObject<List<TestimonialViewModel>>(jsonData);
            return View(testimonial);
        }

        return View();
    }

    public async Task<IActionResult> AddTestimonial(TestimonialViewModel testimonialViewModel)
    {
        var client = _httpClientFactory.CreateClient();
        var jsonData = JsonConvert.SerializeObject(testimonialViewModel);
        StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
        var response = await client.PostAsync("http://localhost:5292/api/AddTestimonial",stringContent);

        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }

        return View();
    }

    public async Task<IActionResult> DeleteTestimonial(int id)
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.DeleteAsync($"http://localhost:5292/api/DeleteTestimonial/{id}");

        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> UpdateTestimonial(int id)
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync($"http://localhost:5292/api/GetTestimonial/{id}");
        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var testimonial = JsonConvert.DeserializeObject<TestimonialViewModel>(jsonData);
            return View(testimonial);
        }
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> UpdateTestimonial(TestimonialViewModel testimonialViewModel)
    {
        var client = _httpClientFactory.CreateClient();
        var jsonData = JsonConvert.SerializeObject(testimonialViewModel);
        StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
        var response = await client.PutAsync($"http://localhost:5292/api/UpdateTestimonial/",
            stringContent);
        
        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }

        return View();
    }
    }
}