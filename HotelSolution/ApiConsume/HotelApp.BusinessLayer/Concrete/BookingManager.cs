namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class BookingManager : IBookingService
{
    private readonly IBookingDal _bookingDal;

    public BookingManager(IBookingDal bookingDal)
    {
        _bookingDal = bookingDal;
    }

    public void TInsert(Booking t)
    {
        _bookingDal.Insert(t);
    }

    public void TDelete(Booking t)
    {
        _bookingDal.Delete(t);
    }

    public void TUpdate(Booking t)
    {
        _bookingDal.Update(t);
    }

    public List<Booking> TGetList()
    {
        return _bookingDal.GetList();
    }

    public Booking TGetById(int id)
    {
        return _bookingDal.GetByID(id);
    }

    public int TGetBookingCount()
    {
        return _bookingDal.GetBookingCount();
    }

    public void TChangeBookingStatusApproved(int id)
    {
        _bookingDal.ChangeBookingStatusApproved(id);
    }

    public void TChangeBookingStatusRejected(int id)
    {
        _bookingDal.ChangeBookingStatusRejected(id);
    }

    public void TChangeBookingStatusPending(int id)
    {
        _bookingDal.ChangeBookingStatusPending(id);
    }

    public List<Booking> TGetLast6Booking()
    {
        return _bookingDal.GetLast6Booking();
    }
}