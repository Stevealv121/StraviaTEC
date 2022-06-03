
namespace StraviaTEC_API
{
    public class User
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string? SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string? SecondSurname { get; set; }
        public string Password { get; set; }
        public string Level { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public DateTime BirthDate { get; set; }
        public string Nationality { get; set; }



    }
}
