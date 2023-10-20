namespace HotelApp.WebUI.ViewComponents.Default;

using DTO.StaffDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _TeamPartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _TeamPartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:5292/api/StaffList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<ResultStaffDTO>>(jsonData);
            return View(values);
        }
        return View();
    }
}