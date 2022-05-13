using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Models
{
    public class Challenge
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime valid_thru { get; set; }
        public string type { get; set; }
        public bool access { get; set; }

    }
}
