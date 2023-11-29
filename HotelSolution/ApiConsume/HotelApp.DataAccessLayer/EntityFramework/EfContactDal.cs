namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfContactDal : GenericRepository<Contact>,IContactDal
{
    public EfContactDal(Context context) : base(context)
    {
        
    }

    public int GetContactCount()
    {
        var context = new Context();
        var value = context.Contacts.Count();
        return value;
    }
}