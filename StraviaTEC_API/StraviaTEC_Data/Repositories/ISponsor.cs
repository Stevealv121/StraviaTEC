using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface ISponsor
    {
        Task<IEnumerable<Sponsor>> GetAll();
        Task<Sponsor> GetbyId(int _id);
        Task<Sponsor> GetbyName(string _name);
        Task<bool> Insert(Sponsor _sponsor);
        Task<bool> Update(Sponsor _sponsor);
        Task<bool> Delete(Sponsor _sponsor);
    }
}
