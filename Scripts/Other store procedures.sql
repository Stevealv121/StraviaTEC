-- Adds

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

-- Belongs to
CREATE PROCEDURE JoinGroup @UserName varchar(15), @GroupId varchar(15)
AS
INSERT INTO BelongsTo (UserName, GroupId)
VALUES (@UserName, @GroupId)
GO

--Manages
--agregar al store procedure de create group
CREATE PROCEDURE DeleteGroupMember @UserName varchar(15), @GroupId varchar(15)
AS
DELETE
FROM BelongsTo
WHERE UserName = @Username AND GroupId = @GroupId
GO

-- Join
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

CREATE PROCEDURE SubmitChallengeScore @UserName varchar(15), @Challenge_ID varchar(15), @ActivityID int
AS

GO
CREATE PROCEDURE JoinRace @UserName varchar(15), @Race_ID varchar(15)
AS
INSERT INTO JOIN_RACE(UserName, Race_ID)
VALUES (@UserName, @Race_ID)
GO

CREATE PROCEDURE ExitRace @UserName varchar(15), @Race_ID varchar(15)
AS
DELETE 
FROM JOIN_RACE
WHERE UserName = @Username AND Race_ID = @Race_ID
GO

CREATE PROCEDURE SubmitRaceScore @UserName varchar(15),@Race_ID varchar(15), @ActivityID int
AS

GO

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

-- Friends activities
CREATE PROCEDURE SelectFriendPosts @UserName varchar(15)
AS
SELECT *
FROM [AllFriendsActivities]
WHERE UserName = @Username 
ORDER BY [Date] ASC
GO
/*
-- Position list
SELECT *
FROM ACTIVITY
ORDER BY Duration ASC;

-- 
INSERT INTO Register(UserName, ActivityId)
VALUES ('sebas',3), ('steve',8)

EXEC SelectFriendPosts 'nati'
*/