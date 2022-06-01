Use StraviaTEC
--USER
-- Adds
GO
CREATE PROCEDURE SelectFriendlist @Username varchar(15)
AS
SELECT FriendUserName, FirstName, SecondName, FirstSurname, SecondSurname, ProfilePicture, [Level], BirthDate
FROM AllFriends
WHERE UserName = @Username 
GO

CREATE PROCEDURE AddFriend @UserName varchar(15), @FriendUserName varchar(15)
AS
INSERT INTO Adds (UserName, FriendUserName)
VALUES (@UserName, @FriendUserName)
GO

CREATE PROCEDURE DeleteFriend @UserName varchar(15), @FriendUserName varchar(15)
AS
DELETE
FROM Adds
WHERE UserName = @Username AND FriendUserName = @FriendUserName
GO

-- Friends activities
CREATE PROCEDURE SelectFriendPosts @UserName varchar(15)
AS
SELECT *
FROM [AllFriendsActivities]
WHERE UserName = @Username 
ORDER BY [Date] ASC
GO
--GROUP
-- Belongs to
CREATE PROCEDURE JoinGroup @UserName varchar(15), @GroupId varchar(15)
AS
INSERT INTO BelongsTo (UserName, GroupId)
VALUES (@UserName, @GroupId)
GO

--Manages

CREATE PROCEDURE DeleteGroupMember @UserName varchar(15), @GroupId varchar(15)
AS
DELETE
FROM BelongsTo
WHERE UserName = @Username AND GroupId = @GroupId
GO

CREATE PROCEDURE SelectGroupByManager @UserName varchar(15)
AS
SELECT * 
FROM [GroupsandManagers]
WHERE UserName = @Username
GO

CREATE PROCEDURE SelectGroupMembers @Name varchar(15)
AS
SELECT UserName
FROM [GroupsandMembers]
WHERE [Name] = @Name
GO
--CHALLENGE
-- Join
CREATE PROCEDURE SelectUserChallenge @UserName varchar(15)
AS
SELECT c.*
FROM ACTIVITY AS a
INNER JOIN Register AS r
ON a.Id = r.ActivityId
INNER JOIN CHALLENGE AS c
ON c.ActivityID=a.Id
WHERE r.UserName = @UserName
GO
CREATE PROCEDURE JoinChallenge @UserName varchar(15), @Challenge_ID varchar(15)
AS
INSERT INTO JOIN_CHALLENGE(UserName, Challenge_ID)
VALUES (@UserName, @Challenge_ID)
GO

CREATE PROCEDURE ExitChallenge @UserName varchar(15), @Challenge_ID varchar(15)
AS
DELETE 
FROM JOIN_CHALLENGE
WHERE UserName = @Username AND Challenge_ID = @Challenge_ID
GO


--RACE
CREATE PROCEDURE SelectUserRace @UserName varchar(15)
AS
SELECT ra.*
FROM ACTIVITY AS a
INNER JOIN Register AS r
ON a.Id = r.ActivityId
INNER JOIN RACE AS ra
ON ra.ActivityID=a.Id
WHERE r.UserName = @UserName
GO
CREATE PROCEDURE JoinRace @UserName varchar(15), @Race_ID varchar(15), @Bill image, @Activityid varchar(15)
AS
INSERT INTO JOIN_RACE(UserName, Race_ID, Bill, Activityid)
VALUES (@UserName, @Race_ID, @Bill, @Activityid)
GO

CREATE PROCEDURE ExitRace @UserName varchar(15), @Race_ID varchar(15)
AS
DELETE 
FROM JOIN_RACE
WHERE UserName = @Username AND Race_ID = @Race_ID
GO

CREATE PROCEDURE SelectUserCategory @UserName varchar(15)
AS
SELECT CategoryName FROM UsersandCategory 
WHERE UserName = @UserName
GO

CREATE PROCEDURE SelectRaceByUserCategory @UserName varchar(15)
AS
SELECT r.* FROM RACE AS r
LEFT JOIN UsersandCategory AS u
ON r.CategoryName = u.CategoryName
WHERE u.UserName =  @UserName OR r.CategoryName = 'Open' 
GO
--ACTIVITY
CREATE PROCEDURE SelectUserActivities @UserName varchar(15)
AS
SELECT a.*
FROM ACTIVITY AS a
INNER JOIN Register AS r
ON a.Id = r.ActivityId
WHERE r.UserName = @UserName
GO
-- Position list
CREATE PROCEDURE RacePositionList @RaceID int
AS
SELECT *
FROM [RacesandUsers]
WHERE ID = @RaceID
ORDER BY Duration ASC
GO
-- 


-- Sponsors
CREATE PROCEDURE AssignRaceSponsor @RaceId int, @SponsorId int
AS
INSERT INTO SponsorsRACE(RaceId, SponsorId)
VALUES (@RaceId, @SponsorId)
GO

CREATE PROCEDURE CancelRaceSponsor @RaceId int, @SponsorId int
AS
DELETE 
FROM SponsorsRACE
WHERE RaceId = @RaceId AND SponsorId = @SponsorId
GO

CREATE PROCEDURE RaceSponsors @RaceID int
AS
SELECT *
FROM [RacesandSponsors]
WHERE ID = @RaceID
GO

--Bank Acoouts
CREATE PROCEDURE AssignRaceBankAccount @RaceId int, @Account bigint
AS
INSERT INTO BANK_ACCOUNT
VALUES (@RaceId,@Account)
GO

CREATE PROCEDURE SelectRaceBankAccounts @RaceId int
AS
SELECT * 
FROM BANK_ACCOUNT
WHERE Race_ID = @RaceId
GO

CREATE PROCEDURE DeleteRaceBankAccount @RaceId int, @Account bigint
AS
DELETE
FROM BANK_ACCOUNT
WHERE Race_ID = @RaceId AND Account = @Account
GO



