
using System.ComponentModel.DataAnnotations;

namespace StraviaTEC_Models
{
    public class Activity
    {
        [Key]
        public int id { get; set; }
        public DateTime date { get; set; }
        public DateTime duration { get; set; }
        public int mileage { get; set; }
        public string sport_name { get; set; }

    }
}
