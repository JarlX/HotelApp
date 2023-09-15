namespace HotelApp.DataAccessLayer.EntityFramework;

using Abstract;
using Concrete;
using EntityLayer.Concrete;
using Repositories;

public class EfTestimonialDal : GenericRepository<Testimonial>, ITestimonialDal
{

    public EfTestimonialDal(Context context) : base(context)
    {
        
    }
}