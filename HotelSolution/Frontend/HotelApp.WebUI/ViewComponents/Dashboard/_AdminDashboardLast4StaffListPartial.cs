namespace HotelApp.WebUI.ViewComponents.Dashboard;

using DTO.StaffDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _AdminDashboardLast4StaffListPartial : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = new HttpClient();
        var response = await client.GetAsync("http://localhost:5292/api/GetLast4Staff");
        
        if (response.IsSuccessStatusCode)
        {
            var jsonData = await response.Content.ReadAsStringAsync();
            var staff = JsonConvert.DeserializeObject<List<ResultStaffDTO>>(jsonData);
            return View(staff);
        }
        return View();
    }
}