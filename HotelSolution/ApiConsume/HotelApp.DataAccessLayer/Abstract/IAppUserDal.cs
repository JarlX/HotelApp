namespace HotelApp.DataAccessLayer.Abstract;

using EntityLayer.Concrete;

public interface IAppUserDal : IGenericDal<AppUser>
{
    List<AppUser> UserListWithWorkLocation();
}