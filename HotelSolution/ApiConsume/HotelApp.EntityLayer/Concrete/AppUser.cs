namespace HotelApp.EntityLayer.Concrete;

using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser<int>
{
    public string Name { get; set; }

    public string SurName { get; set; }

    public string City { get; set; }

    public string ImageUrl { get; set; }

    public string Country { get; set; }
    
    public Gender Gender { get; set; }

    public string WorkDepartment { get; set; }

    public int WorkLocationID { get; set; }

    public WorkLocation WorkLocation { get; set; }
}

public enum Gender
{
    Erkek = 0,
    Kadın = 1,
    Diğer = 2
}