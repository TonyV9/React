using FoodAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodAPI.Database
{
	public class FoodDbContext:DbContext
	{
		public DbSet<Food> Foods { get; set; }

		public FoodDbContext() { }

		public FoodDbContext(DbContextOptions options)
			: base(options) { }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				   .UseSqlServer();
			base.OnConfiguring(optionsBuilder);
		}
	}
}
