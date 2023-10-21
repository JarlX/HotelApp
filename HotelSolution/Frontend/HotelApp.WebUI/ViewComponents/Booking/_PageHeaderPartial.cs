namespace HotelApp.WebUI.ViewComponents.Default;
using Microsoft.AspNetCore.Mvc;


public class _PageHeaderPartial : ViewComponent
{
   
    public IViewComponentResult Invoke()
    {
        return View();
    }
}