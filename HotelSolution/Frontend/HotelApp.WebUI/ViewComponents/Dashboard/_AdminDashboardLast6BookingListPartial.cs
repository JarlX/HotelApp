namespace HotelApp.WebUI.ViewComponents.Dashboard;

using DTO.BookingDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _AdminDashboardLast6BookingListPartial : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = new HttpClient();
        var response = await client.GetAsync("http://localhost:5292/api/GetLast6Booking");

        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var booking = JsonConvert.DeserializeObject<List<ResultBookingDTO>>(jsonData);
            return View(booking);
        }

        return View();
    }
}