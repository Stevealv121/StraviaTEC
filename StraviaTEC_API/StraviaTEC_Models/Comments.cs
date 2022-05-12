using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Models
{
    public class Comments
    {
        public int id { get; set; }
        public int activity_id { get; set; }
        public string author { get; set; }
        public DateTime date { get; set; }
        public string content { get; set; }

        public Comments(int _id,int _activity_id, string _author, DateTime _date, string _content)
        {
            id = _id;
            activity_id = _activity_id;
            author = _author;
            date = _date;
            content = _content;

        }

    }
}
