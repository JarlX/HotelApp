namespace HotelApp.WebUI.Mapping;

using AutoMapper;
using DTO.AboutDTO;
using DTO.BookingDTO;
using DTO.ContactDTO;
using DTO.GuestDTO;
using DTO.LoginDTO;
using DTO.NewsletterDTO;
using DTO.RegisterDTO;
using DTO.RoomDTO;
using DTO.ServiceDTO;
using DTO.StaffDTO;
using DTO.TestimonialDTO;
using DTO.WorkLocationDTO;
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

        CreateMap<CreateContactDTO, Contact>().ReverseMap();

        CreateMap<RoomCreateDTO, Room>().ReverseMap();
        CreateMap<RoomResultDTO, Room>().ReverseMap();
        CreateMap<RoomUpdateDTO, Room>().ReverseMap();

        CreateMap<CreateGuestDTO, Guest>().ReverseMap();
        CreateMap<ResultGuestDTO, Guest>().ReverseMap();
        CreateMap<UpdateGuestDTO, Guest>().ReverseMap();

        CreateMap<ResultWorkLocationDTO, WorkLocation>().ReverseMap();
        CreateMap<CreateWorkLocationDTO, WorkLocation>().ReverseMap();
        CreateMap<UpdateWorkLocationDTO, WorkLocation>().ReverseMap();
    }
}