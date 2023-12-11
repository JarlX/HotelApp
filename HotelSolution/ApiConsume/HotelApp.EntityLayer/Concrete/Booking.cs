namespace HotelApp.EntityLayer.Concrete;

public class Booking
{
    public int BookingID { get; set; }

    public string Name { get; set; }

    public string Mail { get; set; }

    public DateTime CheckIn { get; set; }

    public DateTime CheckOut { get; set; }

    public string AdultCount { get; set; }

    public string ChildCount { get; set; }

    public string SpecialRequest { get; set; }

    public string Description { get; set; }

    public BookingStatus Status { get; set; }
    
    public enum BookingStatus
    {
        Onaylandı = 1,
        Beklemede = 2,
        Reddedildi = 3,
        MüşteriAranacak = 4,
        MüşteriyeUlaşılamadı = 5,
    }
    
}