using System;
using System.Data.SqlClient;

namespace StraviaTEC_Models
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public string first_name { get; set; }
        public string second_name { get; set; }
        public string first_surname { get; set; }
        public string second_surname { get; set; }
        public DateTime birth_date { get; set; }
        public string level { get; set; }


    }
}
