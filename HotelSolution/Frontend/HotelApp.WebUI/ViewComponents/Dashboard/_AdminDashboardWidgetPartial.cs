namespace HotelApp.WebUI.ViewComponents.Dashboard;

using Microsoft.AspNetCore.Mvc;

public class _AdminDashboardWidgetPartial : ViewComponent
{
    private readonly IHttpClientFactory _httpClientFactory;

    public _AdminDashboardWidgetPartial(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("http://localhost:5292/api/GetStaffCount");
        
        if (response.IsSuccessStatusCode)
        {
            var staffCount = await response.Content.ReadAsStringAsync();
            ViewBag.StaffCount = staffCount;
        }

        var response2 =  await client.GetAsync("http://localhost:5292/api/GetBookingCount");
        
        if (response2.IsSuccessStatusCode)
        {
            var bookingCount = await response2.Content.ReadAsStringAsync();
            ViewBag.BookingCount = bookingCount;
        }
        
        var response3 =  await client.GetAsync("http://localhost:5292/api/GetUsersCount");
        
        if (response3.IsSuccessStatusCode)
        {
            var usersCount = await response3.Content.ReadAsStringAsync();
            ViewBag.UsersCount = usersCount;
        }
        
        var response4 =  await client.GetAsync("http://localhost:5292/api/GetRoomCount");
        
        if (response4.IsSuccessStatusCode)
        {
            var roomCount = await response4.Content.ReadAsStringAsync();
            ViewBag.RoomCount = roomCount;
        }
        return View();
    }
    
    
}