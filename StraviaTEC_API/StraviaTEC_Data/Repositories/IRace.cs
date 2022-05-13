using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface IRace
    {
        Task<IEnumerable<Race>> GetAll();
        Task<Race> GetbyId(int _id);
        Task<Race> GetbyName(string _name);
        Task<bool> Insert(Race _race);
        Task<bool> Update(Race _race);
        Task<bool> Delete(Race _race);
    }
}
