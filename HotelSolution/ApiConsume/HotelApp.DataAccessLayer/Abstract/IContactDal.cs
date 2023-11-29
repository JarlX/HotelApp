namespace HotelApp.DataAccessLayer.Abstract;

using EntityLayer.Concrete;

public interface IContactDal : IGenericDal<Contact>
{
    public int GetContactCount();
}