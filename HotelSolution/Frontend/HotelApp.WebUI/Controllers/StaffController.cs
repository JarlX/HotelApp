namespace HotelApp.WebUI.Controllers;

using System.Text;
using Microsoft.AspNetCore.Mvc;
using Models.Staff;
using Newtonsoft.Json;

public class StaffController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public StaffController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IActionResult> Index()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:5292/api/StaffList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var staff = JsonConvert.DeserializeObject<List<StaffViewModel>>(jsonData);
            return View(staff);
        }

        return View();
    }

    public async Task<IActionResult> AddStaff(AddStaffViewModel addStaffViewModel)
    {
        var client = _httpClientFactory.CreateClient();
        var jsonData = JsonConvert.SerializeObject(addStaffViewModel);
        StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
        var response = await client.PostAsync("http://localhost:5292/api/AddStaff",stringContent);

        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }

        return View();
    }

    public async Task<IActionResult> DeleteStaff(int id)
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.DeleteAsync($"http://localhost:5292/api/DeleteStaff/{id}");

        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> UpdateStaff(int id)
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync($"http://localhost:5292/api/GetStaff/{id}");
        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var staff = JsonConvert.DeserializeObject<UpdateStaffViewModel>(jsonData);
            return View(staff);
        }
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> UpdateStaff(UpdateStaffViewModel updateStaffViewModel)
    {
        var client = _httpClientFactory.CreateClient();
        var jsonData = JsonConvert.SerializeObject(updateStaffViewModel);
        StringContent stringContent = new StringContent(jsonData,Encoding.UTF8,"application/json");
        var response = await client.PutAsync($"http://localhost:5292/api/UpdateStaff/",
            stringContent);
        
        if (response.IsSuccessStatusCode)
        {
            return RedirectToAction("Index");
        }

        return View();
    }

    
}