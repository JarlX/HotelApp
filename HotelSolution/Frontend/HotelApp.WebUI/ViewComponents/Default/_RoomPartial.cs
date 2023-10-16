namespace HotelApp.WebUI.ViewComponents.Default;

using DTO.RoomDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _RoomPartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _RoomPartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync($"http://localhost:5292/api/RoomList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<RoomResultDTO>>(jsonData);
            return View(values);
        }
        return View();
    }
}