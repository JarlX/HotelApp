namespace HotelApp.WebUI.ViewComponents.Default;

using DTO.AboutDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _AboutPartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _AboutPartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync($"http://localhost:5292/api/AboutList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<AboutResultDTO>>(jsonData);
            return View(values);
        }
        return View();
    }
}