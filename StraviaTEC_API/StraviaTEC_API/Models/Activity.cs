
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Xml;
namespace StraviaTEC_API
{
    public class Activity
    {
        public string? Username { get; set; }
        public int? Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public int? Mileage { get; set; }
        public byte[]? Route { get; set; }
        public string? SportName { get; set; }

    }
}
