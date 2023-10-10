namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _BookingPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}