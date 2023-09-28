namespace HotelApp.DTOLayer.Dtos.RoomDTO;

using System.ComponentModel.DataAnnotations;

public class RoomUpdateDTO
{
    public int RoomID { get; set; }

    [Required(ErrorMessage = "Lütfen oda numarasını giriniz")]
    public string RoomNumber { get; set; }

    [Required(ErrorMessage = "Lütfen oda görseli ekleyiniz")]
    public string RoomCoverImage { get; set; }

    [Required(ErrorMessage = "Lütfen oda fiyat bilgisi giriniz")]
    public int Price { get; set; }

    [Required(ErrorMessage = "Lütfen oda başlığı bilgisi giriniz")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Lütfen oda yatak sayısını giriniz")]
    public string BedCount { get; set; }

    [Required(ErrorMessage = "Lütfen oda banyo sayısını giriniz")]
    public string BathCount { get; set; }

    public bool WifiStatus { get; set; }

    [Required(ErrorMessage = "Lütfen oda açıklamasını giriniz")]
    public string Description { get; set; }
}