namespace HotelApp.WebUI.Mapping;

using AutoMapper;
using DTO.AboutDTO;
using DTO.BookingDTO;
using DTO.LoginDTO;
using DTO.NewsletterDTO;
using DTO.RegisterDTO;
using DTO.ServiceDTO;
using DTO.StaffDTO;
using DTO.TestimonialDTO;
using EntityLayer.Concrete;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<CreateServiceDTO, Service>().ReverseMap();
        CreateMap<UpdateServiceDTO, Service>().ReverseMap();
        CreateMap<ResultServiceDTO, Service>().ReverseMap();

        CreateMap<CreateNewUserDTO, AppUser>().ReverseMap();
        CreateMap<LoginUserDTO, AppUser>().ReverseMap();

        CreateMap<AboutResultDTO, About>().ReverseMap();
        CreateMap<AboutUpdateDTO, About>().ReverseMap();

        CreateMap<ResultTestimonialDTO, Testimonial>().ReverseMap();
        
        CreateMap<ResultStaffDTO, Staff>().ReverseMap();
        
        CreateMap<CreateNewsletterDTO,Subscribe>().ReverseMap();

        CreateMap<CreateBookingDTO, Booking>().ReverseMap();
        CreateMap<ApproveBookingDTO, Booking>().ReverseMap();
    }
}