namespace HotelApp.WebUI.DTO.RegisterDTO;

using System.ComponentModel.DataAnnotations;

public class CreateNewUserDTO
{
    [Required(ErrorMessage = "Ad Alanı Gereklidir.")]
    public string Name { get; set; }
    
    [Required(ErrorMessage = "Soyad Alanı Gereklidir.")]
    public string Surname { get; set; }
    
    [Required(ErrorMessage = "Kulllanıcı Alanı Gereklidir.")]
    public string Username { get; set; }
    
    [Required(ErrorMessage = "Mail Alanı Gereklidir.")]
    public string Mail { get; set; }
    
    [Required(ErrorMessage = "Şifre Alanı Gereklidir.")]
    [MinLength(6,ErrorMessage = "Şifre En Az 6 Karakter Olmalıdır.")]
    public string Password { get; set; }
    
    [Required(ErrorMessage = "Şifre Tekrar Alanı Gereklidir.")]
    public string ConfirmPassword { get; set; }

    public int WorkLocationID { get; set; }
    
}