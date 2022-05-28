namespace StraviaTEC_API
{
    public class RaceSponsors
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public DateTime Date { get; set; }
        public string Access { get; set; }
        public int ActivityID { get; set; }
        public string CategoryName { get; set; }
        public int SponsorId { get; set; }
        public string ComercialName { get; set; }
        public byte[]? Logo { get; set; }
        public int AgentNumber { get; set; }
        public string FirstName { get; set; }
        public string? SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string? SecondSurname { get; set; }
    }
}
