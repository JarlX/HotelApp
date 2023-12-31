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
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly ISendMessageService _sendMessageService;

        public ContactController(IContactService contactService, ISendMessageService sendMessageService)
        {
            _contactService = contactService;
            _sendMessageService = sendMessageService;
        }

        [HttpGet]
        public IActionResult GetContacts()
        {
            var contacts = _contactService.TGetList();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult GetContact(int id)
        {
            var contact = _contactService.TGetById(id);
            return Ok(contact);
        }

        [HttpPost]
        public IActionResult AddContact(Contact contact)
        {
            contact.MsgDate = Convert.ToDateTime(DateTime.Now.ToString());
            _contactService.TInsert(contact);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateContact(Contact contact)
        {
            _contactService.TUpdate(contact);
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteContact(int id)
        {
            var contact = _contactService.TGetById(id);
            _contactService.TDelete(contact);
            return Ok();
        }
        
        [HttpGet("{id}")]
        public IActionResult GetMessagesByContactId(int id)
        {
            var messages = _sendMessageService.TGetById(id);
            return Ok(messages);
        }

        [HttpGet]
        public IActionResult GetContactCount()
        {
            return Ok(_contactService.TGetContactCount());
        }
    }
}
