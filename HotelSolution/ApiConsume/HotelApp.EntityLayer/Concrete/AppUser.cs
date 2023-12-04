namespace HotelApp.EntityLayer.Concrete;

using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser<int>
{
    public string Name { get; set; }

    public string SurName { get; set; }

    public string City { get; set; }

    public string ImageUrl { get; set; }
}