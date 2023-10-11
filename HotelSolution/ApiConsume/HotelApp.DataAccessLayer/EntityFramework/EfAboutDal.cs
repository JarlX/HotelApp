namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfAboutDal : GenericRepository<About>,IAboutDal
{
    public EfAboutDal(Context context) : base(context)
    {
    }
}