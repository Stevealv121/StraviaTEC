namespace Comments_API.Data
{
    public class CommentsDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty ;
        public string CommentsCollectionName { get; set; }= string.Empty ;
        
    }
}
