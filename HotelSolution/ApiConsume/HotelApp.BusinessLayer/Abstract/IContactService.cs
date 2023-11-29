namespace HotelApp.BusinessLayer.Abstract;

using EntityLayer.Concrete;

public interface IContactService : IGenericService<Contact>
{
    public int TGetContactCount();
}