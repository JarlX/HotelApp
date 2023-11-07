namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfSendMessageDal : GenericRepository<SendMessage>,ISendMessageDal
{
    public EfSendMessageDal(Context context) : base(context)
    {
    }
}