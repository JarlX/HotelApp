namespace HotelApp.WebUI.ViewComponents.Dashboard;

using Microsoft.AspNetCore.Mvc;

public class _AdminDashboardHeadPartial: ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}