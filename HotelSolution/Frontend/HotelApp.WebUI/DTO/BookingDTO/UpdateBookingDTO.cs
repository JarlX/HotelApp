namespace HotelApp.WebUI.DTO.BookingDTO;

using EntityLayer.Concrete;

public class UpdateBookingDTO
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

    public Booking.BookingStatus Status { get; set; }
}