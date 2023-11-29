using FluentValidation;
using FluentValidation.AspNetCore;
using HotelApp.DataAccessLayer.Concrete;
using HotelApp.EntityLayer.Concrete;
using HotelApp.WebUI.DTO.GuestDTO;
using HotelApp.WebUI.Validation.GuestValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<Context>();
builder.Services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<Context>();
builder.Services.AddTransient<IValidator<CreateGuestDTO>, CreateGuestValidator>();
builder.Services.AddTransient<IValidator<UpdateGuestDTO>, UpdateGuestValidator>();
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient ();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMvc(config =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    config.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.ConfigureApplicationCookie(opt =>
{
    opt.Cookie.HttpOnly = true;
    opt.ExpireTimeSpan = TimeSpan.FromMinutes(10);
    opt.LoginPath = "/Login/Index";
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseRouting();

app.UseStatusCodePagesWithReExecute("/ErrorPage/Error{0}","?code={0}");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}");

app.Run();