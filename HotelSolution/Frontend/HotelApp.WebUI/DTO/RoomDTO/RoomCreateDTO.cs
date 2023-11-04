namespace HotelApp.WebUI.DTO.RoomDTO;

public class RoomCreateDTO
{
    public string RoomNumber { get; set; }

    public string RoomCoverImage { get; set; }

    public int Price { get; set; }

    public string Title { get; set; }

    public string BedCount { get; set; }

    public string BathCount { get; set; }

    public bool WifiStatus { get; set; }

    public string Description { get; set; }
}