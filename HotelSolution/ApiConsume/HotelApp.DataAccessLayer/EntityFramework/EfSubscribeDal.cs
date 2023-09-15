namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfSubscribeDal : GenericRepository<Subscribe>,ISubscribeDal
{
    public EfSubscribeDal(Context context) : base(context)
    {
        
    }
}