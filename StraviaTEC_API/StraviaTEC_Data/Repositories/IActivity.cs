using StraviaTEC_Models;

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
