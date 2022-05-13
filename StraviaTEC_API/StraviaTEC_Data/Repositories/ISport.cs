using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface ISport
    {
        Task<IEnumerable<Sport>> GetAll();
        Task<Sport> GetbyName(string _name);
        Task<bool> Insert(Sport _sport);
        Task<bool> Update(Sport _sport);
        Task<bool> Delete(Sport _sport);
    }
}
