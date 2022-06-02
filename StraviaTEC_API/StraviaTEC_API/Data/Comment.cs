using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Comments_API.Data
{
    public class Comment
    {
        [BsonId]
        public ObjectId id { get; set; }
        public int activity_id { get; set; }
        public string author { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime date { get; set; }
        public string content { get; set; }

    }
}
