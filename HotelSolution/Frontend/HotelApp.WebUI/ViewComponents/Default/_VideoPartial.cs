namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _VideoPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}