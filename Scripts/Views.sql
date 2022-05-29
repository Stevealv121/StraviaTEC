-- View for friends
GO
CREATE VIEW [AllFriends] AS
SELECT u.UserName, a.FriendUserName, friend.FirstName, friend.SecondName, friend.FirstSurname, friend.SecondSurname, friend.ProfilePicture, friend.[Level], friend.BirthDate
FROM [USER] AS u
INNER JOIN Adds AS a
ON u.UserName=a.UserName
INNER JOIN [USER] AS friend
ON a.FriendUserName = friend.UserName;
GO
CREATE VIEW [AllFriendsActivities] AS
SELECT friend.UserName, friend.FriendUserName, friend.FirstName, friend.SecondName, friend.FirstSurname, 
		friend.SecondSurname, friend.ProfilePicture, friend.[Level], friend.BirthDate, 
		r.ActivityId, act.[Date], act.Duration, act.Mileage, act.[Route], act.SportName
FROM [AllFriends] AS friend
INNER JOIN Register AS r
ON friend.FriendUserName = r.UserName
INNER JOIN ACTIVITY AS act
ON r.ActivityId = act.Id;
GO
--Select * from AllFriends

CREATE VIEW [RacesandActivities] AS
SELECT r.ID, [Name], r.[Date], Access, r.ActivityID, a.Duration, a.Mileage, a.[Route], a.SportName, reg.UserName,
		u.FirstName, u.SecondName, u.FirstSurname, u.SecondSurname, u.ProfilePicture, u.[Level], u.BirthDate
FROM RACE AS r
INNER JOIN ACTIVITY as a
ON r.ActivityID = a.Id
INNER JOIN Register AS reg
ON reg.ActivityId = a.Id
INNER JOIN [USER] as u
ON u.UserName = reg.UserName;
GO
CREATE VIEW [RacesandUsers] AS
SELECT r.ID,u.UserName, u.FirstName, u.SecondName, u.FirstSurname, u.SecondSurname, jr.Bill, a.Duration, DATEDIFF(hour,u.BirthDate,GETDATE())/8766 AS Age
FROM RACE AS r
INNER JOIN JOIN_RACE as jr
ON jr.Race_ID = r.ID
INNER JOIN [USER] as u
ON u.UserName = jr.UserName
INNER JOIN ACTIVITY as a
ON jr.Activityid = a.Id;
GO
CREATE VIEW [RacesandSponsors] AS
SELECT r.ID, r.[Name], r.Cost, r.[Date], r.Access, r.ActivityID, r.CategoryName, sr.SponsorId, 
		s.ComercialName, s.Logo, s.AgentNumber, s.FirstName, s.SecondName, s.FirstSurname, s.SecondSurname
FROM RACE AS r
INNER JOIN SponsorsRACE AS sr
ON r.ID = sr.RaceId
INNER JOIN SPONSOR AS s
ON sr.SponsorId = s.Id
GO
CREATE VIEW [GroupsandManagers] AS
SELECT g.[Name], g.[Description], m.UserName
FROM [GROUP] AS g
INNER JOIN MANAGES AS m
ON g.[Name] = m.GroupID
GO

CREATE VIEW [GroupsandMembers] AS
SELECT g.[Name], m.UserName
FROM [GROUP] AS g
INNER JOIN BelongsTo AS m
ON g.[Name] = m.GroupId