namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfMessageCategoryDal : GenericRepository<MessageCategory>,IMessageCategoryDal
{
    public EfMessageCategoryDal(Context context) : base(context)
    {
    }
}