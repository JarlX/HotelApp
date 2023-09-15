namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfServiceDal : GenericRepository<Service>,IServiceDal
{
    public EfServiceDal(Context context) : base(context)
    {
        
    }
}