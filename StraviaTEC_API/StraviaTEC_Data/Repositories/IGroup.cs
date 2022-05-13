using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface IGroup
    {
        Task<IEnumerable<Group>> GetAll();
        Task<Group> GetbyName(string _name);
        Task<bool> Insert(Group _group);
        Task<bool> Update(Group _group);
        Task<bool> Delete(Group _group);
    }
}
