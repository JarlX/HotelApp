namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class ContactManager : IContactService
{
    private readonly IContactDal _contactDal;

    public ContactManager(IContactDal contactDal)
    {
        _contactDal = contactDal;
    }

    public void TInsert(Contact t)
    {
        _contactDal.Insert(t);
    }

    public void TDelete(Contact t)
    {
        _contactDal.Delete(t);
    }

    public void TUpdate(Contact t)
    {
        _contactDal.Update(t);
    }

    public List<Contact> TGetList()
    {
        return _contactDal.GetList();
    }

    public Contact TGetById(int id)
    {
        return _contactDal.GetByID(id);
    }
}