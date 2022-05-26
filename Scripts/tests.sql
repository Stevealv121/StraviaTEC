EXEC InsertActivity'sebas', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'nati', 1, '2022-5-25','1:00:00',5,null,Hiking
EXEC InsertActivity'steve', 1, '2022-5-25','00:30:00',5,null,Hiking
EXEC SelectFriendPosts 'sebas'
EXEC SelectFriendlist 'sebas'
select * from Register
select * from ACTIVITY
select * from CATEGORY
select * from RACE
EXEC InsertRace 1, 'Sebas race',20, '2022-5-26', 'public', 3, 'Junior'
EXEC JoinRace 'nati', 1, '022',4
EXEC JoinRace 'steve', 1, '022',5
EXEC RacePositionList 1

EXEC SelectGroupByManager 'sebas'

EXEC SelectGroupMembers 'string'