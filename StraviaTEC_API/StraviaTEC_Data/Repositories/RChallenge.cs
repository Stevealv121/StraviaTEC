using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RChallenge : IChallenge
    {
        public Task<bool> Delete(Challenge _challenge)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Challenge>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Challenge> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Challenge> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Challenge _challenge)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Challenge _challenge)
        {
            throw new NotImplementedException();
        }
    }
}
