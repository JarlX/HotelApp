namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _HeadPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}