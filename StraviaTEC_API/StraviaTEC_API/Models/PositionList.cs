namespace StraviaTEC_API
{
    public class PositionList
    {
        public string UserName { get; set; }
        public string ID { get; set; }
        public string FirstName { get; set; }
        public string? SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string? SecondSurname { get; set; }
        public byte[]? Bill { get; set; }
        public TimeSpan Duration { get; set; }
        public int Age { get; set; }
    }
}
