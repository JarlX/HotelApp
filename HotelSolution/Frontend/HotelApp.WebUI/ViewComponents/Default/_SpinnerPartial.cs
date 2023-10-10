namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _SpinnerPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}