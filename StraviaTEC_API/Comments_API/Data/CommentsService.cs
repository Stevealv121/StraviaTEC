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
        public async Task<List<Comment>> GetAllComments() =>
            await _comments.Find(_ => true).ToListAsync();

        public async Task<Comment> GetComment(int Id) =>
            await _comments.Find(m => m.id == Id).FirstOrDefaultAsync();

        public async Task<List<Comment>> GetActivityComments(int activityId) =>
            await _comments.Find(m => m.activity_id == activityId).ToListAsync();

        public async Task InsertComment(Comment newComment) =>
            await _comments.InsertOneAsync(newComment);

        public async Task DeleteComment(int Id) =>
            await _comments.DeleteOneAsync(m => m.id == Id);
    }
}
