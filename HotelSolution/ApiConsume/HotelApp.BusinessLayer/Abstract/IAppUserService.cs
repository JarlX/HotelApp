namespace HotelApp.BusinessLayer.Abstract;

using EntityLayer.Concrete;

public interface IAppUserService : IGenericService<AppUser>
{
    List<AppUser> TUserListWithWorkLocation();
    
    int TGetAppUserCount();
}