--ACTIVITY store procedures

CREATE PROCEDURE SelectAllActivities
AS
SELECT * 
FROM ACTIVITY
GO

CREATE PROCEDURE SelectActivityById @Id int
AS
SELECT *
FROM ACTIVITY 
WHERE Id = @Id
GO

CREATE PROCEDURE InsertActivity @Username varchar(15), @Id int,@Date date,@Duration time(7),@Mileage int,@Route XML,@SportName varchar(15)
AS
INSERT INTO ACTIVITY ([Date],Duration,Mileage,[Route],SportName)
VALUES (@Date,@Duration,@Mileage,@Route,@SportName) 
SET @Id = SCOPE_IDENTITY()
INSERT INTO Register(UserName, ActivityId)
VALUES (@Username, @Id)
RETURN @Id
GO

CREATE PROCEDURE UpdateActivity @Id int, @Date date,@Duration time(7),@Mileage int,@Route XML,@SportName varchar(15)
AS
UPDATE ACTIVITY 
SET 
    [Date] = @Date,
    Duration = @Duration,
    Mileage = @Mileage,
    [Route] = @Route,
    SportName = @SportName
WHERE Id = @Id
GO

CREATE PROCEDURE DeleteActivity @Id int
AS
DELETE
FROM ACTIVITY
WHERE Id = @Id
DELETE
FROM Register
WHERE ActivityId = @Id
GO

--EXEC SelectAllActivities
--EXEC SelectActivityById @Id = 1
--EXEC InsertActivity @Date = '2022-10-15',@Duration = '17:05:00',@Mileage = 10,@Route = null,@SportName = 'Running'
--EXEC UpdateActivity @Id = 5, @Date = '2020-10-15',@Duration = '17:05:00',@Mileage = 10,@Route = null,@SportName = 'Running'
--EXEC DeleteActivity @Id = 5
--EXEC InsertActivity '2022-10-15','17:05:00',10,null,'Cycling'
--EXEC UpdateActivity 7, '2020-10-15','17:05:00',37,null,'Running'


-- CATEGORY store procedures

CREATE PROCEDURE SelectAllCategories
AS
SELECT [Name] 
FROM CATEGORY
GO

CREATE PROCEDURE SelectCategoryByName @Name varchar(15)
AS
SELECT *
FROM CATEGORY 
WHERE [Name] = @Name 
GO

CREATE PROCEDURE InsertCategory @Name varchar(15), @Description varchar(15)
AS
INSERT INTO CATEGORY ([Name], [Description])
VALUES (@Name, @Description)
GO

CREATE PROCEDURE UpdateCategory @Name varchar(15), @Description varchar(15)
AS
UPDATE CATEGORY 
SET 
    [Name] = @Name,
    [Description] = @Description
WHERE [Name] = @Name
GO

CREATE PROCEDURE DeleteCategory @Name varchar(15)
AS
DELETE
FROM CATEGORY
WHERE [Name] = @Name
GO

-- CHALLENGE store procedures
CREATE PROCEDURE SelectAllChallenges
AS
SELECT * 
FROM CHALLENGE
GO

CREATE PROCEDURE SelectChallengeById @Id int
AS
SELECT *
FROM CHALLENGE 
WHERE Id = @Id
GO

CREATE PROCEDURE SelectChallengeByName @Name varchar(15)
AS
SELECT *
FROM CHALLENGE 
WHERE [Name] = @Name
GO

CREATE PROCEDURE InsertChallenge @Id int,@ValidThru date,@Type varchar(15), @Access varchar(15), @Name varchar(15), @ActivityId int
AS
INSERT INTO CHALLENGE (ValidThru, [Type], Access, [Name], ActivityId)
VALUES (@ValidThru, @Type, @Access, @Name, @ActivityId)
GO

CREATE PROCEDURE UpdateChallenge @Id int,@ValidThru date,@Type varchar(15), @Access varchar(15), @Name varchar(15), @ActivityId int
AS
UPDATE CHALLENGE 
SET 
    ValidThru = @ValidThru,
    [Type] = @Type,
    Access = @Access,
    [Name] = @Name,
    ActivityId = @ActivityId
WHERE Id = @Id
GO

CREATE PROCEDURE DeleteChallenge @Id int
AS
DELETE
FROM CHALLENGE
WHERE Id = @Id
GO


-- GROUP store procedures
CREATE PROCEDURE SelectAllGroups
AS
SELECT [Name] 
FROM [GROUP]
GO

CREATE PROCEDURE SelectGroupByName @Name varchar(15)
AS
SELECT *
FROM [GROUP] 
WHERE [Name] = @Name 
GO

CREATE PROCEDURE InsertGroup @Username varchar(15), @Name varchar(15), @Description varchar(15)
AS
INSERT INTO [GROUP] ([Name], [Description])
VALUES (@Name, @Description)
INSERT INTO Manages(UserName, GroupID)
VALUES (@Username, @Name)
GO

CREATE PROCEDURE UpdateGroup @Name varchar(15), @Description varchar(15)
AS
UPDATE [GROUP] 
SET 
    [Name] = @Name,
    [Description] = @Description
WHERE [Name] = @Name
GO

CREATE PROCEDURE DeleteGroup @Name varchar(15)
AS
DELETE
FROM [GROUP]
WHERE [Name] = @Name
DELETE
FROM BelongsTo
WHERE GroupId = @Name
DELETE
FROM MANAGES
WHERE GroupID = @Name
GO

-- RACE store procedures

CREATE PROCEDURE SelectAllRaces
AS
SELECT * 
FROM RACE
GO

CREATE PROCEDURE SelectRaceById @Id int
AS
SELECT *
FROM RACE 
WHERE ID = @Id
GO

CREATE PROCEDURE SelectRaceByName @Name varchar(15)
AS
SELECT *
FROM RACE 
WHERE [Name] = @Name
GO

CREATE PROCEDURE InsertRace @Id int,@Name varchar(15),@Cost int ,@Date date,@Access varchar(15),@ActivityID int, @CategoryName varchar(15)
AS
INSERT INTO RACE ([Name],Cost,[Date],Access,ActivityID,CategoryName)
VALUES (@Name,@Cost,@Date,@Access,@ActivityID,@CategoryName)
GO

CREATE PROCEDURE UpdateRace @Id int,@Name varchar(15),@Cost int ,@Date date,@Access varchar(15),@ActivityID int
AS
UPDATE RACE 
SET 
    [Name] = @Name,
    Cost = @Cost,
    [Date] = @Date,
    Access = @Access,
    ActivityID = @ActivityID
WHERE ID = @Id
GO

CREATE PROCEDURE DeleteRace @Id int
AS
DELETE
FROM RACE
WHERE ID = @Id
GO

-- SPONSOR store procedures

CREATE PROCEDURE SelectAllSponsors
AS
SELECT * 
FROM SPONSOR
GO

CREATE PROCEDURE SelectSponsorById @Id int
AS
SELECT *
FROM SPONSOR 
WHERE Id = @Id
GO

CREATE PROCEDURE SelectSponsorByName @Name varchar(15)
AS
SELECT *
FROM SPONSOR 
WHERE ComercialName = @Name
GO

CREATE PROCEDURE InsertSponsor @Id int, @ComercialName varchar(15),@Logo image,@AgentNumber int,@FirstName varchar(15),@SecondName varchar(15),@FirstSurname varchar(15),@SecondSurname varchar(15)
AS
INSERT INTO SPONSOR (ComercialName,Logo,AgentNumber,FirstName,SecondName,FirstSurname,SecondSurname)
VALUES (@ComercialName,@Logo,@AgentNumber,@FirstName,@SecondName,@FirstSurname,@SecondSurname)
GO

CREATE PROCEDURE UpdateSponsor @Id int, @ComercialName varchar(15),@Logo image,@AgentNumber int,@FirstName varchar(15),@SecondName varchar(15),@FirstSurname varchar(15),@SecondSurname varchar(15)
AS
UPDATE SPONSOR 
SET 
    ComercialName = @ComercialName,
    Logo = @Logo,
    AgentNumber = @AgentNumber,
    FirstName = @FirstName,
    SecondName = @SecondName,
    FirstSurname = @FirstSurname,
    SecondSurname = @SecondSurname
WHERE Id = @Id
GO

CREATE PROCEDURE DeleteSponsor @Id int
AS
DELETE
FROM SPONSOR
WHERE Id = @Id
GO

-- SPORT store procedures
CREATE PROCEDURE SelectAllSports
AS
SELECT [Name] 
FROM SPORT
GO

CREATE PROCEDURE SelectSportByName @Name varchar(15)
AS
SELECT *
FROM SPORT 
WHERE [Name] = @Name 
GO

CREATE PROCEDURE InsertSport @Name varchar(15), @Description varchar(15)
AS
INSERT INTO SPORT ([Name], [Description])
VALUES (@Name, @Description)
GO

CREATE PROCEDURE UpdateSport @Name varchar(15), @Description varchar(15)
AS
UPDATE SPORT 
SET 
    [Name] = @Name,
    [Description] = @Description
WHERE [Name] = @Name
GO

CREATE PROCEDURE DeleteSport @Name varchar(15)
AS
DELETE
FROM SPORT
WHERE [Name] = @Name
GO
-- USER store procedures
CREATE PROCEDURE SelectAllUsers
AS
SELECT * 
FROM [USER]
GO

CREATE PROCEDURE SelectUserByUsername @Username varchar(15), @Password varchar(15)
AS
SELECT *
FROM [USER] 
WHERE UserName = @Username AND [Password] = @Password
GO

CREATE PROCEDURE InsertUser @UserName varchar(15), @FirstName varchar(15), @SecondName varchar(15), 
							@FirstSurname varchar(15), @SecondSurname varchar(15), @Password varchar(15), 
							@Level varchar(15), @ProfilePicture image, @BirthDate date
AS
INSERT INTO [USER] (UserName, FirstName, SecondName, FirstSurname, SecondSurname, [Password],[Level], ProfilePicture, BirthDate)
VALUES (@UserName, @FirstName, @SecondName, @FirstSurname, @SecondSurname, @Password,@Level, @ProfilePicture, @BirthDate)
GO

CREATE PROCEDURE UpdateUser @UserName varchar(15), @FirstName varchar(15), @SecondName varchar(15), 
							@FirstSurname varchar(15), @SecondSurname varchar(15), @Password varchar(15), 
							@Level varchar(15), @ProfilePicture image, @BirthDate date
AS
UPDATE [USER] 
SET 
    UserName = @UserName,
    FirstName = @FirstName,
    SecondName = @SecondName,
    FirstSurname = @FirstSurname,
    SecondSurname = @SecondSurname,
    [Password] = @Password,
    [Level] = @Level,
    ProfilePicture = @ProfilePicture,
    BirthDate = @BirthDate
WHERE UserName = @UserName
GO

CREATE PROCEDURE DeleteUser @UserName varchar(15), @Password varchar(15)
AS
DELETE
FROM [USER]
WHERE UserName = @UserName AND [Password] = @Password
GO

