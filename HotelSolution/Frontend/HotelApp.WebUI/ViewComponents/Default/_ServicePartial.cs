namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _ServicePartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}