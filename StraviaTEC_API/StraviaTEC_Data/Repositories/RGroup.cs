using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RGroup : IGroup
    {
        public Task<bool> Delete(Group _group)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Group>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Group> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Group _group)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Group _group)
        {
            throw new NotImplementedException();
        }
    }
}
