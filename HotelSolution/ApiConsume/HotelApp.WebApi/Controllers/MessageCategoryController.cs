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
    public class MessageCategoryController : ControllerBase
    {
        private readonly IMessageCategoryService _messageCategoryService;

        public MessageCategoryController(IMessageCategoryService messageCategoryService)
        {
            _messageCategoryService = messageCategoryService;
        }

        [HttpGet]
        public IActionResult GetMessageCategories()
        {
            var messageCategories = _messageCategoryService.TGetList();
            return Ok(messageCategories);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetMessageCategory(int id)
        {
            var messageCategory = _messageCategoryService.TGetById(id);
            return Ok(messageCategory);
        }

        [HttpPost]
        public IActionResult AddMessageCategory(MessageCategory messageCategory)
        {
            _messageCategoryService.TInsert(messageCategory);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateMessageCategory(MessageCategory messageCategory)
        {
            _messageCategoryService.TUpdate(messageCategory);
            return Ok();
        }
        
        [HttpDelete]
        public IActionResult DeleteMessageCategory(int id)
        {
            var messageCategory = _messageCategoryService.TGetById(id);
            _messageCategoryService.TDelete(messageCategory);
            return Ok();
        }
    }
}
