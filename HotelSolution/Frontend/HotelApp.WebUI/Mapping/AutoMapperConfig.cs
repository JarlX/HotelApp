namespace HotelApp.WebUI.Mapping;

using AutoMapper;
using DTO.LoginDTO;
using DTO.RegisterDTO;
using DTO.ServiceDTO;
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

    }
}