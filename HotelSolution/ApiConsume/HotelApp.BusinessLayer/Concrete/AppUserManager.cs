namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class AppUserManager : IAppUserService
{
    private readonly IAppUserDal _appUserDal;

    public AppUserManager(IAppUserDal appUserDal)
    {
        _appUserDal = appUserDal;
    }

    public void TInsert(AppUser t)
    {
        throw new NotImplementedException();
    }

    public void TDelete(AppUser t)
    {
        throw new NotImplementedException();
    }

    public void TUpdate(AppUser t)
    {
        throw new NotImplementedException();
    }

    public List<AppUser> TGetList()
    {
        throw new NotImplementedException();
    }

    public AppUser TGetById(int id)
    {
        throw new NotImplementedException();
    }

    public List<AppUser> TUserListWithWorkLocation()
    {
        return _appUserDal.UserListWithWorkLocation();
    }

    public int TGetAppUserCount()
    {
        return _appUserDal.GetAppUserCount();
    }
}