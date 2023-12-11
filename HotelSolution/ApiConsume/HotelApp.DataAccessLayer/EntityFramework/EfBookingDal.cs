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

    public List<Booking> GetLast6Booking()
    {
        using var context = new Context();
        return context.Bookings.OrderByDescending(x => x.BookingID).Take(6).ToList();
    }
}