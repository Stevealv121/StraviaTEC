using System.Data.SqlClient;
using StraviaTEC_Models;
using Dapper;

namespace StraviaTEC_Data.Repositories
{
    public class RSponsor : ISponsor
    {
        private SQLConfig connectionStr;

        public RSponsor(SQLConfig connectionString)
        {
            connectionStr = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(connectionStr.ConnectionStr);
        }
        public async Task<bool> Delete(Sponsor _sponsor)
        {
            var db = dbConnection();
            var sql = @"DELETE
                        FROM SPONSOR
                        WHERE ComercialName = @Name";
            var result = await db.ExecuteAsync(sql, new { Name = _sponsor.ComercialName });
            return result > 0;
        }

        public async Task<IEnumerable<Sponsor>> GetAll()
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM SPONSOR";
            return await db.QueryAsync<Sponsor>(sql, new { });
        }

        public async Task<Sponsor> GetbyId(int _id)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM SPONSOR 
                       WHERE Id = @id";
            return await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { id = _id });
        }

        public async Task<Sponsor> GetbyName(string _name)
        {
            var db = dbConnection();
            var sql = @"SELECT *
                       FROM SPONSOR 
                       WHERE ComercialName = @Name";
            return await db.QueryFirstOrDefaultAsync<Sponsor>(sql, new { Name = _name });
        }

        public async Task<bool> Insert(Sponsor _sponsor)
        {
            var db = dbConnection();
            var sql = @"
                        INSERT INTO SPONSOR (ComercialName,Logo,AgentNumber,FirstName,SecondName,FirstSurname,SecondSurname)
                        VALUES (@ComercialName,@Logo,@AgentNumber,@FirstName,@SecondName,@FirstSurname,@SecondSurname)";
            var result = await db.ExecuteAsync(sql, new
            {
                _sponsor.ComercialName,
                _sponsor.Logo,
                _sponsor.AgentNumber,
                _sponsor.FirstName,
                _sponsor.SecondName,
                _sponsor.FirstSurname,
                _sponsor.SecondSurname
            });
            return result > 0;
        }

        public async Task<bool> Update(Sponsor _sponsor)
        {
            var db = dbConnection();
            var sql = @"
                        UPDATE SPONSOR 
                        SET 
                            ComercialName = @ComercialName,
                            Logo = @Logo,
                            AgentNumber = @AgentNumber,
                            FirstName = @FirstName,
                            SecondName = @SecondName,
                            FirstSurname = @FirstSurname,
                            SecondSurame = @SecondSurame
                        WHERE Id = @Id";
            var result = await db.ExecuteAsync(sql, new
            {
                _sponsor.ComercialName,
                _sponsor.Logo,
                _sponsor.AgentNumber,
                _sponsor.FirstName,
                _sponsor.SecondName,
                _sponsor.FirstSurname,
                _sponsor.SecondSurname,
                _sponsor.Id

            });
            return result > 0;
        }
    }
}
