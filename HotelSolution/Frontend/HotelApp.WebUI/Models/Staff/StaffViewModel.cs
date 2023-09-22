namespace HotelApp.WebUI.Models.Staff;

public class StaffViewModel
{
    public StaffViewModel()
    {
        FullName = FirstName + LastName;
    }

    public int StaffID { get; set; }

    public string StaffTitle { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string FullName { get; set; }
}