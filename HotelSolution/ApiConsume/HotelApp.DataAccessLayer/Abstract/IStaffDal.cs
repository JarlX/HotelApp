namespace HotelApp.DataAccessLayer.Abstract;

using EntityLayer.Concrete;

public interface IStaffDal : IGenericDal<Staff>
{
    int GetStaffCount();
    
    List<Staff> GetLast4Staff();
}