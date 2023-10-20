namespace HotelApp.WebUI.ViewComponents.Default;

using DTO.ServiceDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _ServicePartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _ServicePartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync($"http://localhost:5292/api/ServiceList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<ResultServiceDTO>>(jsonData);
            return View(values);
        }
        return View();
    }
}