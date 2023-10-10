namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _AboutPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}