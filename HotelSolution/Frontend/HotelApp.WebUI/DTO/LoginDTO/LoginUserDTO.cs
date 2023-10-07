namespace HotelApp.WebUI.DTO.LoginDTO;

using System.ComponentModel.DataAnnotations;


public class LoginUserDTO
{
    
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}