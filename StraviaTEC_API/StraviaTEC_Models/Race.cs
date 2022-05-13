using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Models
{
    public class Race
    {
        public int id { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        public List<int> bank_accounts { get; set; }
        public DateTime date { get; set; }
        public bool access { get; set; }

    }
}
