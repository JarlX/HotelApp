namespace HotelApp.WebUI.Mapping;

using AutoMapper;
using DTO.ServiceDTO;
using EntityLayer.Concrete;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<CreateServiceDTO, Service>().ReverseMap();
        CreateMap<UpdateServiceDTO, Service>().ReverseMap();
        CreateMap<ResultServiceDTO, Service>().ReverseMap();
        
    }
}