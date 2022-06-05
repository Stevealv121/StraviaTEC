EXEC InsertActivity'sebas', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'nati', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'steve', 1, '2022-5-25','00:30:00',5,null,Hiking
EXEC SelectFriendPosts 'sebas'
EXEC SelectFriendlist 'sebas'
select * from Register
select * from ACTIVITY
select * from CATEGORY
select * from RACE
EXEC InsertRace 1, 'a race',50, '2022-5-31', 'string', 4, 'Open'
EXEC JoinRace 'nati', 3, '022',10
EXEC JoinRace 'steve', 3, '022',10
EXEC JoinGroup 'nati', 'group'
EXEC RacePositionList 1
EXEC RaceSponsors 1

EXEC SearchUsers 'Sebastian'

EXEC SelectGroupByManager 'nati'
+
.
EXEC SelectGroupMembers 'string'

EXEC SelectAllChallenges

EXEC SelectUserActivities 'sebas'
EXEC SelectUserRace 'sebas'
EXEC SelectUserChallenge 'nati'

EXEC AssignRaceBankAccount 1,555
EXEC SelectRaceBankAccounts 1
EXEC DeleteRaceBankAccount 1,555

EXEC SelectUserBelongsToGroups 'nati'
EXEC SelectUserBelongsToChallenge 'nati'
EXEC SelectUserBelongsToRace 'nati'


EXEC DeleteActivity 3
SELECT * FROM Register
SELECT * FROM Activity
SELECT * FROM RACE
SELECT * FROM CHALLENGE
SELECT * FROM BANK_ACCOUNT



--exec DeleteRace 18
SELECT * FROM RACE
SELECT * FROM JOIN_RACE
SELECT * FROM SponsorsRACE
SELECT * FROM BANK_ACCOUNT

SELECT * FROM CHALLENGE
SELECT * FROM JOIN_CHALLENGE


