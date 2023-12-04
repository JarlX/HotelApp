namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class MessageCategoryManager : IMessageCategoryService
{
    private readonly IMessageCategoryDal _messageCategoryDal;

    public MessageCategoryManager(IMessageCategoryDal messageCategoryDal)
    {
        _messageCategoryDal = messageCategoryDal;
    }

    public void TInsert(MessageCategory t)
    {
        _messageCategoryDal.Insert(t);
    }

    public void TDelete(MessageCategory t)
    {
        _messageCategoryDal.Delete(t);
    }

    public void TUpdate(MessageCategory t)
    {
        _messageCategoryDal.Update(t);
    }

    public List<MessageCategory> TGetList()
    {
        return _messageCategoryDal.GetList();
    }

    public MessageCategory TGetById(int id)
    {
        return _messageCategoryDal.GetByID(id);
    }
}