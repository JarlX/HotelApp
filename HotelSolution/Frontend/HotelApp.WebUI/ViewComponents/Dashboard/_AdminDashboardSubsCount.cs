namespace HotelApp.WebUI.ViewComponents.Dashboard;

using DTO.FollowersDTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class _AdminDashboardSubsCount : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri("https://instagram-profile1.p.rapidapi.com/getprofile/salihcancakar"),
            Headers =
            {
                { "X-RapidAPI-Key", "f8fcd6953bmsh67e5a9359eeca61p10787cjsnc08196175f03" },
                { "X-RapidAPI-Host", "instagram-profile1.p.rapidapi.com" },
            },
        };
        var request2 = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri("https://twitter154.p.rapidapi.com/user/details?username=salihcancakar"),
            Headers =
            {
                { "X-RapidAPI-Key", "f8fcd6953bmsh67e5a9359eeca61p10787cjsnc08196175f03" },
                { "X-RapidAPI-Host", "twitter154.p.rapidapi.com" },
            },
        };
        
        var request3 = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri("https://linkedin-profile-data-api.p.rapidapi.com/connection-count?username=salihcancakar"),
            Headers =
            {
                { "X-RapidAPI-Key", "f8fcd6953bmsh67e5a9359eeca61p10787cjsnc08196175f03" },
                { "X-RapidAPI-Host", "linkedin-profile-data-api.p.rapidapi.com" },
            },
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            ResultInstagramFollowersDTO followersInsta = JsonConvert.DeserializeObject<ResultInstagramFollowersDTO>(body);
            ViewBag.InstagramFollowers = followersInsta.followers;
            ViewBag.InstagramFollowing = followersInsta.following;
        }
        using (var response = await client.SendAsync(request2))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            ResultTwitterFollowersDTO followersTwit = JsonConvert.DeserializeObject<ResultTwitterFollowersDTO>(body);
            ViewBag.TwitterFollowers = followersTwit.follower_count;
            ViewBag.TwitterFollowing = followersTwit.following_count;
        }
        
        using (var response = await client.SendAsync(request3))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            ResultLinkedinConnectionsDTO followersLinkedin = JsonConvert.DeserializeObject<ResultLinkedinConnectionsDTO>(body);
            ViewBag.LinkedinConnections = followersLinkedin.connection;
            ViewBag.LinkedinFollowers = followersLinkedin.follower;

        }

        return View();
    }
}