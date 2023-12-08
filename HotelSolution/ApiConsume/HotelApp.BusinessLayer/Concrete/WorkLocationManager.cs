namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class WorkLocationManager : IWorkLocationService
{
    private readonly IWorkLocationDal _workLocationDal;

    public WorkLocationManager(IWorkLocationDal workLocationDal)
    {
        _workLocationDal = workLocationDal;
    }

    public void TInsert(WorkLocation t)
    {
        _workLocationDal.Insert(t);
    }

    public void TDelete(WorkLocation t)
    {
        _workLocationDal.Delete(t);
    }

    public void TUpdate(WorkLocation t)
    {
        _workLocationDal.Update(t);
    }

    public List<WorkLocation> TGetList()
    {
        return _workLocationDal.GetList();
    }

    public WorkLocation TGetById(int id)
    {
        return _workLocationDal.GetByID(id);
    }
}