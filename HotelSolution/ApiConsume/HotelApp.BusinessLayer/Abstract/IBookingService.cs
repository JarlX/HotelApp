namespace HotelApp.BusinessLayer.Abstract;

using EntityLayer.Concrete;

public interface IBookingService : IGenericService<Booking>
{
    int TGetBookingCount();

    void TChangeBookingStatusApproved(int id);
    
    void TChangeBookingStatusRejected(int id);
    
    void TChangeBookingStatusPending(int id);
    
    List<Booking> TGetLast6Booking();
}