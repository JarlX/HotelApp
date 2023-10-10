namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _NewsletterPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}