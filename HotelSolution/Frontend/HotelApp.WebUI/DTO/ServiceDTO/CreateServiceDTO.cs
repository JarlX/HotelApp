namespace HotelApp.WebUI.DTO.ServiceDTO;

using System.ComponentModel.DataAnnotations;

public class CreateServiceDTO
{

    [Required(ErrorMessage = "Hizmet ikon giriniz")]
    public string ServiceIcon { get; set; }
    
    [Required(ErrorMessage = "Hizmet başlığı giriniz")]
    public string Title { get; set; }
    
    [Required(ErrorMessage = "Hizmet açıklaması giriniz")]
    public string Description { get; set; }
}