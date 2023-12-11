namespace HotelApp.DataAccessLayer.Abstract;

using EntityLayer.Concrete;

public interface IBookingDal : IGenericDal<Booking>
{
    int GetBookingCount();
    
    List<Booking> GetLast6Booking();
}