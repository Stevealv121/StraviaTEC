using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_API
{
    /* The Challenge class has an Id, ValidThru, Type, Access, Name, and ActivityId */
    public class Challenge
    {
        public int Id { get; set; }
        public DateTime ValidThru { get; set; }
        public string Type { get; set; }
        public string Access { get; set; }
        public string Name { get; set; }
        public int ActivityId { get; set; }

    }
}
