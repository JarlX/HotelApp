namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfBookingDal : GenericRepository<Booking>,IBookingDal
{
    public EfBookingDal(Context context) : base(context)
    {
    }

    public int GetBookingCount()
    {
        using var context = new Context();
        return context.Bookings.Count();
    }

    public void ChangeBookingStatusApproved(int id)
    {
        using var context = new Context();
        var result = context.Bookings.Find(id);
        result.Status = Booking.BookingStatus.Onaylandı;
        context.SaveChanges();
    }

    public void ChangeBookingStatusRejected(int id)
    {
        using var context = new Context();
        var result = context.Bookings.Find(id);
        result.Status = Booking.BookingStatus.Reddedildi;
        context.SaveChanges();
    }

    public void ChangeBookingStatusPending(int id)
    {
        using var context = new Context();
        var result = context.Bookings.Find(id);
        result.Status = Booking.BookingStatus.Beklemede;
        context.SaveChanges();
    }

    public List<Booking> GetLast6Booking()
    {
        using var context = new Context();
        return context.Bookings.OrderByDescending(x => x.BookingID).Take(6).ToList();
    }
}