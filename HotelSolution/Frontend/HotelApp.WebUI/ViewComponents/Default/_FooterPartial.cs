namespace HotelApp.WebUI.ViewComponents.Default;

using Microsoft.AspNetCore.Mvc;

public class _FooterPartial : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
    
}