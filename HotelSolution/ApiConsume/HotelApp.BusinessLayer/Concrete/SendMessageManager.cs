namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class SendMessageManager : ISendMessageService
{
    private readonly ISendMessageDal _sendMessage;

    public SendMessageManager(ISendMessageDal sendMessage)
    {
        _sendMessage = sendMessage;
    }


    public void TInsert(SendMessage t)
    {
        _sendMessage.Insert(t);
    }

    public void TDelete(SendMessage t)
    {
        _sendMessage.Delete(t);
    }

    public void TUpdate(SendMessage t)
    {
        _sendMessage.Update(t);
    }

    public List<SendMessage> TGetList()
    {
        return _sendMessage.GetList();
    }

    public SendMessage TGetById(int id)
    {
        return _sendMessage.GetByID(id);
    }
}