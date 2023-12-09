namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Repositories;

public class EfAppUserDal : GenericRepository<AppUser>,IAppUserDal
{
    public EfAppUserDal(Context context) : base(context)
    {
    }

    public List<AppUser> UserListWithWorkLocation()
    {
        var context = new Context();
        return context.Users.Include(x => x.WorkLocation).ToList();
    }
}