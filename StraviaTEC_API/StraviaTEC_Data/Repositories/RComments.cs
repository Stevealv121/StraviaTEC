using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public class RComments : IComments
    {
        public Task<bool> DeleteComment(Comments comment)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Comments>> GetActivityComments(int activity_id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Comments>> GetAllComments()
        {
            throw new NotImplementedException();
        }

        public async Task<Comments> GetComment(int id)
        {
            Comments comments = new Comments(5,1,"Nati",new DateTime(2022,5,12),"Esto es un comentario");

            return comments;
        }
        public  Comments GettComment()
        {
            Comments comments = new Comments(5, 1, "Nati", new DateTime(2022, 5, 12), "Esto es un comentario");

            return comments;
        }

        public Task<bool> InsertComment(Comments comment)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateComment(Comments comment)
        {
            throw new NotImplementedException();
        }
    }
}
