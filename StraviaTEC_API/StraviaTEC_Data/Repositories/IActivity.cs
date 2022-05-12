using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public interface IActivity
    {
        public Task<IEnumerable<Activity>> GetAllActivities();
    }
}
