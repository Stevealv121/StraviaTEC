using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface ICategory
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category> GetbyName(string _name);
        Task<bool> Insert(Category _category);
        Task<bool> Update(Category _category);
        Task<bool> Delete(Category _category);
    }
}
