namespace HotelApp.DataAccessLayer.EntityFramework;

using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfBookingDal : GenericRepository<Booking>
{
    public EfBookingDal(Context context) : base(context)
    {
    }
}