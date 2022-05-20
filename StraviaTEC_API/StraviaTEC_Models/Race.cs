﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Models
{
    public class Race
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public DateTime Date { get; set; }
        public string Access { get; set; }
        public string ActivityID { get; set; }

    }
}
