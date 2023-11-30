using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebApi.Controllers
{
    using BusinessLayer.Abstract;
    using EntityLayer.Concrete;

    [Route("api/[action]")]
    [ApiController]
    public class SendMessageController : ControllerBase
    {
        private readonly ISendMessageService _sendMessageService;

        public SendMessageController(ISendMessageService sendMessageService)
        {
            _sendMessageService = sendMessageService;
        }

        [HttpGet]
        public IActionResult SendMessageList()
        {
            var sendMessages = _sendMessageService.TGetList();
            return Ok(sendMessages);
        }
        
        [HttpGet("{id:int}")]
        public IActionResult GetSendMessage(int id)
        {
            var sendMessage = _sendMessageService.TGetById(id);
            return Ok(sendMessage);
        }
        
        [HttpPost]
        public IActionResult AddSendMessage(SendMessage sendMessage)
        {
            _sendMessageService.TInsert(sendMessage);
            return Ok();
        }
        
        [HttpPut]
        public IActionResult UpdateSendMessage(SendMessage sendMessage)
        {
            _sendMessageService.TUpdate(sendMessage);
            return Ok();
        }
        
        [HttpDelete]
        public IActionResult DeleteSendMessage(int id)
        {
            var sendMessage = _sendMessageService.TGetById(id);
            _sendMessageService.TDelete(sendMessage);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetSendMessageCount()
        {
            return Ok(_sendMessageService.TGetContactCount());
        }
    }
}
