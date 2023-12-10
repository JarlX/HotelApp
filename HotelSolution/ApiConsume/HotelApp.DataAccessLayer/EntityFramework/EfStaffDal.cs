namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfStaffDal : GenericRepository<Staff>,IStaffDal
{
    public EfStaffDal(Context context) : base(context)
    {
    }

    public int GetStaffCount()
    {
        using var context = new Context();
        return context.Staffs.Count();
    }
}