namespace HotelApp.EntityLayer.Concrete;

public class Staff
{
    public Staff()
    {
        FullName = FirstName + " " + LastName;
    }

    public int StaffID { get; set; }

    public string StaffImage { get; set; }

    public string StaffTitle { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string FullName { get; set; }

    public string SocialMedia1 { get; set; }
    
    public string SocialMedia2 { get; set; }
    
    public string SocialMedia3 { get; set; }
}