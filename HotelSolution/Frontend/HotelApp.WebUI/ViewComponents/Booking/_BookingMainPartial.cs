namespace HotelApp.WebUI.ViewComponents.Default;
using Microsoft.AspNetCore.Mvc;


public class _BookingMainPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}