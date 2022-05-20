using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RUser : IUser
    {
        private SQLConfig connectionStr;

        public RUser(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public async Task<bool> Delete(User _user)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM [USER]
                        WHERE UserName = @Name";
            var result = await db.ExecuteAsync(sql, new { Name = _user.UserName });
            return result > 0;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM [USER]";
            return await db.QueryAsync<User>(sql, new { });
        }

        public async Task<User> GetUserDetails(string _username, string _password)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM [USER] 
                       WHERE UserName = @username AND Password = password";
            return await db.QueryFirstOrDefaultAsync<User>(sql, new { username = _username, password = _password });
        }

        public async Task<bool> Insert(User _user)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO [USER] (UserName,FirstName,SecondName,FirstSurname,SecondSurname,Password,Level,ProfilePicture,BirthDate)
                        VALUES (@UserName,@FirstName,@SecondName,@FirstSurname,@SecondSurname,@Password,@Level,@ProfilePicture,@BirthDate)";
            var result = await db.ExecuteAsync(sql, new
            {
                _user.UserName,
                _user.FirstName,
                _user.SecondName,
                _user.FirstSurname,
                _user.SecondSurname,
                _user.Password,
                _user.Level,
                _user.ProfilePicture,
                _user.BirthDate
            });
            return result > 0;
        }

        public async Task<bool> Update(User _user)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE [USER] 
                        SET 
                            UserName = @UserName,
                            FirstName = @FirstName,
                            SecondName = @SecondName,
                            FirstSurname = @FirstSurname,
                            SecondSurame = @SecondSurame,
                            Password = @Password,
                            Level = @Level,
                            ProfilePicture = @ProfilePicture,
                            BirthDate = @BirthDate
                        WHERE UserName = @UserName";
            var result = await db.ExecuteAsync(sql, new
            {
                _user.UserName,
                _user.FirstName,
                _user.SecondName,
                _user.FirstSurname,
                _user.SecondSurname,
                _user.Password,
                _user.Level,
                _user.ProfilePicture,
                _user.BirthDate

            });
            return result > 0;
        }
    }
}
