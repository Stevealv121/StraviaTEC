using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RUser : IUser
    {
        public Task<bool> Delete(User _user)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserDetails(string _username, string _password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(User _user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(User _user)
        {
            throw new NotImplementedException();
        }
    }
}
