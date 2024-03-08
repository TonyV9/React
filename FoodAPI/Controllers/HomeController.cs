using FoodAPI.Database;
using FoodAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FoodController : Controller
	{
		private readonly FoodDbContext context;
		public FoodController(FoodDbContext _context)
		{
			context = _context;
		}

		[HttpPost("add")]
		public async Task<IActionResult> Add(AddFoodModel model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var food = new Food()
			{
				Description = model.Description.Trim(),
				Carbs = model.Carbs,
				Kcal = model.Kcal,
				Fat = model.Fat,
				Protein = model.Protein
			};
			try
			{
				await context.AddAsync(food);
				await context.SaveChangesAsync();
			}
			catch (Exception)
			{
				return BadRequest("Error occured. Please try again!");
			}

			return Ok(food);
		}
	}
}
