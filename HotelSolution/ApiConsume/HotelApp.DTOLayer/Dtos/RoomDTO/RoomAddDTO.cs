namespace HotelApp.DTOLayer.Dtos.RoomDTO;

using System.ComponentModel.DataAnnotations;

public class RoomAddDTO
{
    [Required(ErrorMessage = "Lütfen oda numarasını giriniz")]
    public string RoomNumber { get; set; }

    public string RoomCoverImage { get; set; }

    [Required(ErrorMessage = "Lütfen fiyat bilgisi giriniz")]
    public int Price { get; set; }

    [Required(ErrorMessage = "Lütfen oda başlığı bilgisi giriniz")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Lütfen yatak sayısını giriniz")]
    public string BedCount { get; set; }

    [Required(ErrorMessage = "Lütfen banyo sayısını giriniz")]
    public string BathCount { get; set; }

    public bool WifiStatus { get; set; }

    public string Description { get; set; }
}