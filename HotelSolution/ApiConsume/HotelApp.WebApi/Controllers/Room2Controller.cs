using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using AutoMapper;
    using BusinessLayer.Abstract;
    using DTOLayer.Dtos.RoomDTO;
    using EntityLayer.Concrete;

    [Route("api/2/[action]")]
    [ApiController]
    public class Room2Controller : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapper;

        public Room2Controller(IRoomService roomService, IMapper mapper)
        {
            _roomService = roomService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var values = _roomService.TGetList();
            return Ok(values);
        }

        [HttpPost]
        public IActionResult AddRoom(RoomAddDTO roomAddDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var values = _mapper.Map<Room>(roomAddDto);
            _roomService.TInsert(values);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateRoom(RoomUpdateDTO roomUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var values = _mapper.Map<Room>(roomUpdateDto);
            _roomService.TUpdate(values);
            return Ok();
        }
        
        
    }
}
