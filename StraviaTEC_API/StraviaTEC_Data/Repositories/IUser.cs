using StraviaTEC_Models;

namespace StraviaTEC_Data.Repositories
{
    public interface IUser
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetUserDetails(string _username, string _password);
        Task<bool> Insert(User _user);
        Task<bool> Update(User _user);
        Task<bool> Delete(User _user);
    }
}
