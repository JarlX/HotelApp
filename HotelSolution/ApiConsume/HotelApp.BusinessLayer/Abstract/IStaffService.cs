namespace HotelApp.BusinessLayer.Abstract;

using EntityLayer.Concrete;

public interface IStaffService : IGenericService<Staff>
{
    int TGetStaffCount();
}