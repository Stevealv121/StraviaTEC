EXEC InsertActivity'sebas', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'nati', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'steve', 1, '2022-5-25','00:30:00',5,null,Hiking
EXEC SelectFriendPosts 'sebas'
EXEC SelectFriendlist 'sebas'
select * from Register
select * from ACTIVITY
select * from CATEGORY
select * from RACE
EXEC InsertRace 1, 'Sebas race',50, '2022-5-31', 'public', 3, 'Junior'
EXEC JoinRace 'nati', 1, '022',4
EXEC JoinRace 'steve', 1, '022',5
EXEC RacePositionList 1
EXEC RaceSponsors 1

EXEC SearchUsers 'Sebastian'

EXEC SelectGroupByManager 'nati'

EXEC SelectGroupMembers 'string'

EXEC SelectAllChallenges

EXEC SelectUserActivities 'sebas'
EXEC SelectUserRace 'sebas'
EXEC SelectUserChallenge 'nati'

EXEC AssignRaceBankAccount 1,555
EXEC SelectRaceBankAccounts 1
EXEC DeleteRaceBankAccount 1,555