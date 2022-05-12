using StraviaTEC_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StraviaTEC_Data.Repositories
{
    public interface IComments
    {
        Task<IEnumerable<Comments>> GetAllComments();
        Task<Comments> GetComment(int id);
        Task<IEnumerable<Comments>> GetActivityComments(int activity_id);
        Task<bool> InsertComment(Comments comment);
        Task<bool> UpdateComment(Comments comment);
        Task<bool> DeleteComment(Comments comment);
        Comments GettComment();
    }
}
