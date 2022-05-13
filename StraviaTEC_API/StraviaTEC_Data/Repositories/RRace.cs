using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RRace : IRace
    {
        public Task<bool> Delete(Race _race)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Race>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Race> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Race> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Race _race)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Race _race)
        {
            throw new NotImplementedException();
        }
    }
}
