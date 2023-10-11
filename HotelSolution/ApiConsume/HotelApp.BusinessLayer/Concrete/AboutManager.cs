namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class AboutManager : IAboutService
{
    private readonly IAboutDal _aboutDal;

    public AboutManager(IAboutDal aboutDal)
    {
        _aboutDal = aboutDal;
    }

    public void TInsert(About t)
    {
        _aboutDal.Insert(t);
    }

    public void TDelete(About t)
    {
        _aboutDal.Delete(t);
    }

    public void TUpdate(About t)
    {
        _aboutDal.Update(t);
    }

    public List<About> TGetList()
    {
        return _aboutDal.GetList();
    }

    public About TGetById(int id)
    {
        return _aboutDal.GetByID(id);
    }
}