namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _TeamPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}