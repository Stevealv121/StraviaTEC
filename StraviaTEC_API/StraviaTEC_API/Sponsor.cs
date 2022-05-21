using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Models
{
    public class Sponsor
    {
        public int Id { get; set; }
        public string ComercialName { get; set; }
        public byte[]? Logo { get; set; }
        public int AgentNumber { get; set; }
        public string FirstName { get; set; }
        public string? SecondName { get; set; }
        public string FirstSurname { get; set; }
        public string? SecondSurname { get; set; }
    }
}
