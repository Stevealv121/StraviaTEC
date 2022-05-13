using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RCategory : ICategory
    {
        public Task<bool> Delete(Category _category)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetbyName(string _name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Insert(Category _category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Category _category)
        {
            throw new NotImplementedException();
        }
    }
}
