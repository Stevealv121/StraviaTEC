Use StraviaTEC
--USER
-- Adds
GO

CREATE PROCEDURE SearchUsers @Input varchar(15)
AS
if (SELECT charindex(' ',@Input)) = 0
BEGIN
    SELECT *
    FROM [USER]
    where
		UserName =@Input
		OR
        FirstName = @Input
		OR
		SecondName = @Input
        OR
        FirstSurname = @Input
		OR
		SecondSurname = @Input
END
else

BEGIN
    SELECT *
    FROM [USER]
    WHERE
	FirstName + ' ' + FirstSurname LIKE + '%' + @input + '%'
	OR
	FirstName + ' ' + SecondName LIKE + '%' + @input + '%'
	OR
	SecondName + ' ' + FirstSurname LIKE + '%' + @input + '%'
	OR
	SecondName + ' ' + SecondSurname LIKE + '%' + @input + '%'
	OR
	FirstSurname + ' ' + SecondSurname LIKE + '%' + @input + '%'
	
END
GO
--EXEC SelectUserNumbers 'nati'
CREATE PROCEDURE SelectUserNumbers @Username varchar(15)
AS
BEGIN
DECLARE @following int
DECLARE @followers int
DECLARE @activities int

SELECT @following = COUNT(FriendUserName)
FROM [AllFriends]
WHERE UserName=@Username

SELECT @followers = COUNT(UserName)
FROM [AllFriends]
WHERE FriendUserName=@Username

SELECT @activities = COUNT(UserName)
FROM Register
WHERE UserName = @Username

SELECT u.FirstName, u.FirstSurname, u.ProfilePicture, @following AS [Following], @followers AS [Followers], @activities AS Activities
FROM [USER] AS u
WHERE UserName = @Username
END
GO
--EXEC SearchUsers 'Gonzalez Bermudez'
--DROP PROCEDURE SearchUsers
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
CREATE PROCEDURE SelectUserBelongsToGroups @UserName varchar(15)
AS
SELECT g.*
FROM BelongsTo AS b
INNER JOIN [GROUP] AS g
ON b.GroupId = g.[Name]
WHERE b.UserName= @UserName
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
SELECT UserName, FirstName, SecondName, FirstSurname, SecondSurname, Age
FROM [GroupsandMembers]
WHERE [Name] = @Name
GO
--DROP PROCEDURE SelectGroupMembers
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

CREATE PROCEDURE SelectUserBelongsToChallenge @UserName varchar(15)
AS
SELECT c.*
FROM JOIN_CHALLENGE AS j
INNER JOIN CHALLENGE AS c
ON j.Challenge_ID = c.Id
WHERE j.UserName = @UserName
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
CREATE PROCEDURE SelectAllJoinsChallenge
AS
SELECT *
FROM JOIN_CHALLENGE
GO

--RACE
CREATE PROCEDURE SelectAllJoinsRace
AS
SELECT *
FROM JOIN_RACE
GO
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

CREATE PROCEDURE SelectUserBelongsToRace @UserName varchar(15)
AS
SELECT r.*
FROM JOIN_RACE AS j
INNER JOIN RACE AS r
ON j.Race_ID = r.ID
WHERE j.UserName = @UserName
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
SELECT DISTINCT r.* 
FROM RACE AS r
INNER JOIN UsersandCategory AS u
ON r.CategoryName = u.CategoryName OR r.CategoryName = 'Open'
INNER JOIN BelongsTo as b
ON (b.GroupId = r.Access AND u.UserName = b.UserName) OR r.Access = 'public'
WHERE u.UserName =  @UserName 
GO

CREATE PROCEDURE UpdateJoinRace @RaceID int,@ActivityID int, @UserName varchar(15)
AS
UPDATE JOIN_RACE 
SET 
    Activityid = @ActivityID
WHERE Race_ID = @RaceID AND UserName = @UserName
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
BEGIN

DECLARE @RaceCategory VARCHAR(15)
SELECT @RaceCategory = RACE.CategoryName
FROM RACE
WHERE ID = @RaceID
if @RaceCategory = 'Open'
	SELECT *
	FROM [RacesandUsers]
	WHERE ID = @RaceID
	ORDER BY Duration ASC
else
	SELECT *
	FROM [RacesandUsers]
	WHERE ID = @RaceID
	ORDER BY CategoryName,
	Duration ASC
END
GO
--DROP PROCEDURE RacePositionList
-- EXEC RacePositionList 25
--EXEC RacePositionList 1
--DROP PROCEDURE SearchUsers

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



