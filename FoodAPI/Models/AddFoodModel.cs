using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models
{
	public class AddFoodModel
	{
		[Required]
		[MinLength(2)]
		[MaxLength(30)]
		public string Description { get; set; } = null!;

		[Required]
		[Range(0f, 9999f)]
		[DefaultValue(0)]
		public float Kcal { get; set; }

		[Required]
		[Range(0f, 9999f)]
		[DefaultValue(0)]
		public float Protein { get; set; }

		[Required]
		[Range(0f, 9999f)]
		[DefaultValue(0)]
		public float Fat { get; set; }

		[Required]
		[Range(0f, 9999f)]
		[DefaultValue(0)]
		public float Carbs { get; set; }
	}
}
