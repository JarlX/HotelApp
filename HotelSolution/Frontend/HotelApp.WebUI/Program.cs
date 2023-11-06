using FluentValidation;
using FluentValidation.AspNetCore;
using HotelApp.DataAccessLayer.Concrete;
using HotelApp.EntityLayer.Concrete;
using HotelApp.WebUI.DTO.GuestDTO;
using HotelApp.WebUI.Validation.GuestValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<Context>();
builder.Services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<Context>();
builder.Services.AddTransient<IValidator<CreateGuestDTO>, CreateGuestValidator>();
builder.Services.AddTransient<IValidator<UpdateGuestDTO>, UpdateGuestValidator>();
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient ();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



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

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}");

app.Run();