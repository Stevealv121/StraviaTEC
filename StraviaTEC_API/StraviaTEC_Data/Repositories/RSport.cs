using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RSport : ISport
    {
        public Task<bool> Delete(Sport _sport)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Sport>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Sport> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Sport _sport)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Sport _sport)
        {
            throw new NotImplementedException();
        }
    }
}
