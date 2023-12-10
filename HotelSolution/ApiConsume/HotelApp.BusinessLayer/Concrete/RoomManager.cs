namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class RoomManager : IRoomService
{
    private readonly IRoomDal _roomDal;

    public RoomManager(IRoomDal roomDal)
    {
        _roomDal = roomDal;
    }

    public void TInsert(Room t)
    {
        _roomDal.Insert(t);
    }

    public void TDelete(Room t)
    {
        _roomDal.Delete(t);
    }

    public void TUpdate(Room t)
    {
        _roomDal.Update(t);
    }

    public List<Room> TGetList()
    {
        return _roomDal.GetList();
    }

    public Room TGetById(int id)
    {
        return _roomDal.GetByID(id);
    }

    public int TGetRoomCount()
    {
        return _roomDal.GetRoomCount();
    }
}