using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models
{
	public class Food
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		[MinLength(2)]
		[MaxLength(30)]
		public string Description { get; set; } = null!;

		[Required]
		[Range(0f, 5000f)]
		public float Kcal { get; set; }

		[Required]
		[Range(0f, 5000f)]
		public float Protein { get; set; }

		[Required]
		[Range(0f, 5000f)]
		public float Fat { get; set; }

		[Required]
		[Range(0f, 5000f)]
		public float Carbs { get; set; }
	}
}
