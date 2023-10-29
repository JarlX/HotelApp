namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfGuestDal : GenericRepository<Guest>, IGuestDal
{
    public EfGuestDal(Context context) : base(context)
    {
    }
}