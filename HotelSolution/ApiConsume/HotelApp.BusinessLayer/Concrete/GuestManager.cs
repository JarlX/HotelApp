namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class GuestManager : IGuestService
{
    private readonly IGuestDal _guestDal;

    public GuestManager(IGuestDal guestDal)
    {
        _guestDal = guestDal;
    }

    public void TInsert(Guest t)
    {
        _guestDal.Insert(t);
    }

    public void TDelete(Guest t)
    {
        _guestDal.Delete(t);
    }

    public void TUpdate(Guest t)
    {
        _guestDal.Update(t);
    }

    public List<Guest> TGetList()
    {
        return _guestDal.GetList();
    }

    public Guest TGetById(int id)
    {
        return _guestDal.GetByID(id);
    }
}