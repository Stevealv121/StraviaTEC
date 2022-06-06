using MongoDB.Driver;
using Microsoft.Extensions.Options;
namespace Comments_API.Data
{
    public class CommentsService
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentsService(IOptions<CommentsDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            _comments = mongoClient.GetDatabase(options.Value.DatabaseName)
                .GetCollection<Comment>(options.Value.CommentsCollectionName);

        }
       /// <summary>
       /// Get all comments from the database and return them as a list of comments.
       /// </summary>
        public async Task<List<Comment>> GetAllComments() =>
            await _comments.Find(_ => true).ToListAsync();

        /// <summary>
        /// GetComment returns a comment with the given id.
        /// </summary>
        /// <param name="Id">The id of the comment you want to get.</param>
        public async Task<Comment> GetComment(int Id) =>
            await _comments.Find(m => m.id.Equals(Id)).FirstOrDefaultAsync();

        /// <summary>
        /// Get all comments from the comments collection where the activity_id is equal to the
        /// activityId parameter.
        /// </summary>
        /// <param name="activityId">The id of the activity that the comments are associated
        /// with.</param>
        public async Task<List<Comment>> GetActivityComments(int activityId) =>
            await _comments.Find(m => m.activity_id == activityId).ToListAsync();

        /// <summary>
        /// Insert a new comment into the database.
        /// </summary>
        /// <param name="Comment">The object that we want to insert into the database.</param>
        public async Task InsertComment(Comment newComment) =>
            await _comments.InsertOneAsync(newComment);

        /// <summary>
        /// Delete all comments that have the same activity_id as the activity_id of the activity that
        /// is being deleted
        /// </summary>
        /// <param name="Id">The id of the comment to be deleted</param>
        public async Task DeleteComment(int Id) =>
            await _comments.DeleteAsync(m => m.activity_id.Equals(Id));
    }
}
