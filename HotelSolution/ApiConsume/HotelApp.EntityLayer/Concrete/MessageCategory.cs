namespace HotelApp.EntityLayer.Concrete;

public class MessageCategory
{
    public int MessageCategoryID { get; set; }

    public string MessageCateegoryName { get; set; }

    public List<Contact> Contacts { get; set; }
}