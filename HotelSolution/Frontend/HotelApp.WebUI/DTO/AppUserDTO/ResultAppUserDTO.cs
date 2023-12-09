namespace HotelApp.WebUI.DTO.AppUserDTO;

using EntityLayer.Concrete;

public class ResultAppUserDTO
{
    public string Name { get; set; }

    public string SurName { get; set; }

    public string City { get; set; }

    public string ImageUrl { get; set; }

    public string Country { get; set; }

    public Gender Gender { get; set; }
    public bool EmailConfirmed { get; set; }

    public string WorkDepartment { get; set; }

    public int WorkLocationID { get; set; }
}