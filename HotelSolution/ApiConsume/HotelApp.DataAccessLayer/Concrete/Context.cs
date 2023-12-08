namespace HotelApp.DataAccessLayer.Concrete;

using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class Context : IdentityDbContext<AppUser,AppRole,int>
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
            optionsBuilder.UseSqlServer(
                "Data Source=localhost; Initial Catalog = HotelApp;User ID=SA;Password=reallyStrongPwd123;TrustServerCertificate = true");
        
    }

    public DbSet<Room> Rooms { get; set; }
    
    public DbSet<Service> Services { get; set; }
    
    public DbSet<Staff> Staffs { get; set; }
    
    public DbSet<Subscribe> Subscribes { get; set; }
    
    public DbSet<Testimonial> Testimonials { get; set; }
    
    public DbSet<About> Abouts { get; set; }
    
    public DbSet<Booking> Bookings { get; set; }

    public DbSet<Guest> Guests { get; set; }

    public DbSet<Contact> Contacts { get; set; }

    public DbSet<SendMessage> SendMessages { get; set; }

    public DbSet<MessageCategory> MessageCategories { get; set; }
    
    public DbSet<WorkLocation> WorkLocations { get; set; }
}
