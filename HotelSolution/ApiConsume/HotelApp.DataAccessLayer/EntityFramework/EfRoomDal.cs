namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfRoomDal : GenericRepository<Room>,IRoomDal
{
    public EfRoomDal(Context context) : base(context)
    {
        
    }

    public int GetRoomCount()
    {
        var context = new Context();
        return context.Rooms.Count();
    }
}