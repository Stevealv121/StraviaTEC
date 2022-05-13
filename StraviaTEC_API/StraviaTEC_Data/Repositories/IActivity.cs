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
        Task<IEnumerable<Activity>> GetAll();
        Task<Activity> GetbyId(int _id);
        Task<Activity> GetbyName(string _name);
        Task<bool> Insert(Activity _activity);
        Task<bool> Update(Activity _activity);
        Task<bool> Delete(Activity _activity);
    }
}
