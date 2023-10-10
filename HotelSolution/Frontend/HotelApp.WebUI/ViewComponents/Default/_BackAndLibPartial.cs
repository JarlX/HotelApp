namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _BackAndLibPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}