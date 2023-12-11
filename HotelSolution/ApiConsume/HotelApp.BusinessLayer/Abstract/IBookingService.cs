namespace HotelApp.BusinessLayer.Abstract;

using EntityLayer.Concrete;

public interface IBookingService : IGenericService<Booking>
{
    int TGetBookingCount();

    List<Booking> TGetLast6Booking();
}