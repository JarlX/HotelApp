namespace HotelApp.WebUI.DTO.ContactDTO;

using SendMessageDTO;

public class ResultContactDTO
{
    public int ContactID { get; set; }

    public string SenderName { get; set; }

    public string Subject { get; set; }
    
    public string SenderMail { get; set; }
    
    public string Message { get; set; }

    public DateTime MsgDate { get; set; }
    
    public ResultSendMessageDTO? ResultSendMessageDto { get; set; }

    
}