namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _RoomPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}