using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.WebUI.Controllers
{
    using System.Text;
    using DTO.ContactDTO;
    using DTO.SendMessageDTO;
    using Newtonsoft.Json;

    public class AdminContactController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AdminContactController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> Inbox()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/GetContacts");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var contacts = JsonConvert.DeserializeObject<List<InboxContactDTO>>(jsonData);
                
                var contactCount = await client.GetAsync("http://localhost:5292/api/GetContactCount");
                var sendMessageCount = await client.GetAsync("http://localhost:5292/api/GetSendMessageCount");
                if (contactCount.IsSuccessStatusCode)
                {
                    var jsonDataContactCount = await contactCount.Content.ReadAsStringAsync();
                    var jsonDataSendMessageCount = await sendMessageCount.Content.ReadAsStringAsync();
                    ViewBag.dataContactCount = jsonDataContactCount;
                    ViewBag.dataSendMessageCount = jsonDataSendMessageCount;
                }

                return View(contacts);
                
            }
            
            return View();
        }

        public async Task<IActionResult> Sendbox()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("http://localhost:5292/api/SendMessageList");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var sendMessages = JsonConvert.DeserializeObject<List<SendboxContactDTO>>(jsonData);
                
                var contactCount = await client.GetAsync("http://localhost:5292/api/GetContactCount");
                var sendMessageCount = await client.GetAsync("http://localhost:5292/api/GetSendMessageCount");
                if (contactCount.IsSuccessStatusCode)
                {
                    var jsonDataContactCount = await contactCount.Content.ReadAsStringAsync();
                    var jsonDataSendMessageCount = await sendMessageCount.Content.ReadAsStringAsync();
                    ViewBag.dataContactCount = jsonDataContactCount;
                    ViewBag.dataSendMessageCount = jsonDataSendMessageCount;
                }
                return View(sendMessages);
            }

            return View();
        }

        [HttpGet]
        public IActionResult AddSendMessage()
        {
            return View();
        }
        
        [HttpPost]
        public async Task<IActionResult> AddSendMessage(CreateSendMessageDTO createSendMessageDto)
        {
            createSendMessageDto.SenderMail = "admin@goldfish.com";
            createSendMessageDto.SenderName = "Admin";
            createSendMessageDto.Date = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createSendMessageDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("http://localhost:5292/api/AddSendMessage", stringContent);

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Sendbox");
            }

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> MessageDetailsBySendBox(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"http://localhost:5292/api/GetMessagesByContactId/{id}");
            
            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var sendMessage = JsonConvert.DeserializeObject<GetMessageByIdDTO>(jsonData);
                return View(sendMessage);
            }
            
            return View();
        }
        
        [HttpGet]
        public async Task<IActionResult> MessageDetailsByInbox(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"http://localhost:5292/api/GetContact/{id}");
            
            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                var sendMessage = JsonConvert.DeserializeObject<InboxContactDTO>(jsonData);
                return View(sendMessage);
            }
            
            return View();
        }
    }
}