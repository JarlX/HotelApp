namespace HotelApp.BusinessLayer.Concrete;

using Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;

public class SendMessageManager : ISendMessageService
{
    private readonly ISendMessageDal _sendMessageDal;

    public SendMessageManager(ISendMessageDal sendMessage)
    {
        _sendMessageDal = sendMessage;
    }


    public void TInsert(SendMessage t)
    {
        _sendMessageDal.Insert(t);
    }

    public void TDelete(SendMessage t)
    {
        _sendMessageDal.Delete(t);
    }

    public void TUpdate(SendMessage t)
    {
        _sendMessageDal.Update(t);
    }

    public List<SendMessage> TGetList()
    {
        return _sendMessageDal.GetList();
    }

    public SendMessage TGetById(int id)
    {
        return _sendMessageDal.GetByID(id);
    }

    public int TGetContactCount()
    {
        return _sendMessageDal.GetSendMessageCount();
    }
}