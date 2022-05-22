-- View for friends
CREATE VIEW [AllFriends] AS
SELECT u.UserName, a.FriendUserName, friend.FirstName, friend.SecondName, friend.FirstSurname, friend.SecondSurname, friend.ProfilePicture, friend.[Level], friend.BirthDate
FROM [USER] AS u
INNER JOIN Adds AS a
ON u.UserName=a.UserName
INNER JOIN [USER] AS friend
ON a.FriendUserName = friend.UserName;



