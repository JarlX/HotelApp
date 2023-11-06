namespace HotelApp.WebUI.Validation.GuestValidation;

using DTO.GuestDTO;
using FluentValidation;

public class UpdateGuestValidator :AbstractValidator<UpdateGuestDTO>
{
    public UpdateGuestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("İsim Boş Olamaz");
        RuleFor(x => x.Surname).NotEmpty().WithMessage("Soyisim Boş Olamaz");
        RuleFor(x => x.City).NotEmpty().WithMessage("Şehir Boş Olamaz");
        
        RuleFor(x=>x.Name).MinimumLength(2).WithMessage("İsim En Az 2 Karakter Olmalıdır");
        RuleFor(x=>x.Surname).MinimumLength(3).WithMessage("Soyisim En Az 2 Karakter Olmalıdır");
        RuleFor(x=>x.City).MinimumLength(3).WithMessage("Şehir En Az 2 Karakter Olmalıdır");
        
        RuleFor(x=>x.Name).MaximumLength(20).WithMessage("İsim En Fazla 20 Karakter Olmalıdır");
        RuleFor(x=>x.Surname).MaximumLength(20).WithMessage("Soyisim En Fazla 20 Karakter Olmalıdır");
        RuleFor(x=>x.City).MaximumLength(20).WithMessage("Şehir En Fazla 20 Karakter Olmalıdır");
    }
    
}