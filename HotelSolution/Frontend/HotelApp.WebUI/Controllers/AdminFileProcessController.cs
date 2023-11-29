using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace HotelApp.WebUI.Controllers
{
    public class AdminFileProcessController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

       
        [HttpPost]
        public async Task<IActionResult> Index(IFormFile file)
        {
            var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var bytes = stream.ToArray();

            ByteArrayContent byteArrayContent = new ByteArrayContent(bytes);
            byteArrayContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
            MultipartFormDataContent multipartFormDataContent = new MultipartFormDataContent();
            multipartFormDataContent.Add(byteArrayContent,"file",file.FileName);

            var httpClient = new HttpClient();
            var responseMessage = await httpClient.PostAsync("https://localhost:44305/api/UploadFile",multipartFormDataContent);

            if (responseMessage.IsSuccessStatusCode)
            {
                return View();
            }
            return View();
        }
    }
}