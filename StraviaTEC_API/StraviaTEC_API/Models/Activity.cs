
using System.ComponentModel.DataAnnotations;
using System.Xml;
namespace StraviaTEC_API
{
    public class Activity
    {
        public int? Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public int? Mileage { get; set; }
        public XmlAttribute? Route { get; set; }
        public string? SportName { get; set; }

    }
}
