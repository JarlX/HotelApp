namespace HotelApp.WebUI.ViewComponents.Default;

using DTO.TestimonialDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _TestimonialPartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _TestimonialPartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:5292/api/TestimonialList");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var values = JsonConvert.DeserializeObject<List<ResultTestimonialDTO>>(jsonData);
            return View(values);
        }
        return View();
    }
}