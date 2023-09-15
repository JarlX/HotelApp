namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class StaffManager : IStaffService
{
    private readonly IStaffDal _staffDal;

    public StaffManager(IStaffDal staffDal)
    {
        _staffDal = staffDal;
    }

    public void TInsert(Staff t)
    {
        _staffDal.Insert(t);
    }

    public void TDelete(Staff t)
    {
        _staffDal.Delete(t);
    }

    public void TUpdate(Staff t)
    {
        _staffDal.Update(t);
    }

    public List<Staff> TGetList()
    {
        return _staffDal.GetList();
    }

    public Staff GetById(int id)
    {
        return _staffDal.GetByID(id);
    }
}