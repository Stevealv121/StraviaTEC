using System.Xml;
namespace StraviaTEC_API
{
    public class FriendPost
    {
        public string UserName { get; set; }
        public string FriendUserName { get; set; }
        public string FirstName { get; set; }
        public string? SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string? SecondSurname { get; set; }
        public string Level { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public DateTime BirthDate { get; set; }
        public int ActivityId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public int? Mileage { get; set; }
        public XmlAttribute? Route { get; set; }
        public string? SportName { get; set; }
    }
}
