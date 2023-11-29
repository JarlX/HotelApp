namespace HotelApp.WebUI.Models.Mail;

public class AdminMailViewModel
{
    public int MailID { get; set; }

    public string MailName { get; set; }

    public string SenderMail { get; set; }

    public string ReceiverMail { get; set; }

    public string MailSubject { get; set; }

    public string MailBody { get; set; }
}