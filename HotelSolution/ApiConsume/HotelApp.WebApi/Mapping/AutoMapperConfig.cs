namespace HotelApp.WebApi.Mapping;

using AutoMapper;
using DTOLayer.Dtos.RoomDTO;
using EntityLayer.Concrete;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<RoomAddDTO, Room>().ReverseMap();

        CreateMap<RoomUpdateDTO, Room>().ReverseMap();
    }
}