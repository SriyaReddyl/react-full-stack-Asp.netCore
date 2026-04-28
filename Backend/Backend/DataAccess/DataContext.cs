using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess
{
    public class DataContext : DbContext
    {
        // ✅ Required for repository pattern
        public DataContext()
        {
        }

        // ✅ Used by Dependency Injection
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Music> Musics { get; set; }
        public DbSet<User> Users { get; set; }
		public DbSet<CartItem> CartItems { get; set; }
		public DbSet<Order> Orders { get; set; }
    }
}