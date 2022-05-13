using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface IChallenge
    {
        Task<IEnumerable<Challenge>> GetAll();
        Task<Challenge> GetbyId(int _id);
        Task<Challenge> GetbyName(string _name);
        Task<bool> Insert(Challenge _challenge);
        Task<bool> Update(Challenge _challenge);
        Task<bool> Delete(Challenge _challenge);
    }
}
