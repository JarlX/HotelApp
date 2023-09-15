namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class ServiceManager : IServiceService
{
    private readonly IServiceDal _serviceDal;

    public ServiceManager(IServiceDal serviceDal)
    {
        _serviceDal = serviceDal;
    }

    public void TInsert(Service t)
    {
        _serviceDal.Insert(t);
    }

    public void TDelete(Service t)
    {
        _serviceDal.Delete(t);
    }

    public void TUpdate(Service t)
    {
        _serviceDal.Update(t);
    }

    public List<Service> TGetList()
    {
        return _serviceDal.GetList();
    }

    public Service GetById(int id)
    {
        return _serviceDal.GetByID(id);
    }
}