using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RSponsor : ISponsor
    {
        public Task<bool> Delete(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Sponsor>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Sponsor> GetbyId(int _id)
        {
            throw new NotImplementedException();
        }

        public Task<Sponsor> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Sponsor _sponsor)
        {
            throw new NotImplementedException();
        }
    }
}
