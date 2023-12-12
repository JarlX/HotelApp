namespace HotelApp.DataAccessLayer.Abstract;

using EntityLayer.Concrete;

public interface IBookingDal : IGenericDal<Booking>
{
    int GetBookingCount();
    
    void ChangeBookingStatusApproved(int id);
    
    void ChangeBookingStatusRejected(int id);
    
    void ChangeBookingStatusPending(int id);
    
    List<Booking> GetLast6Booking();
}