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
}