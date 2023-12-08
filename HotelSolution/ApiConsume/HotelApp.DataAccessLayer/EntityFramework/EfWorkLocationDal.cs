namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfWorkLocationDal : GenericRepository<WorkLocation>,IWorkLocationDal
{
    public EfWorkLocationDal(Context context) : base(context)
    {
    }
}