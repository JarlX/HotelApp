namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _NavbarPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}