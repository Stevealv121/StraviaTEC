CREATE TRIGGER DeleteGroupTrigger
ON [BelongsTo]
FOR DELETE 
AS
BEGIN
	DELETE
	FROM MANAGES
	WHERE GroupId IN(SELECT deleted.GroupId FROM deleted)
	DELETE
	FROM [GROUP]
	WHERE [Name] IN(SELECT deleted.GroupId FROM deleted) 
	
END
GO

CREATE TRIGGER DeleteRaceTrigger
ON [RacesandActivities]
INSTEAD OF DELETE 
AS
BEGIN
	DELETE
	FROM SponsorsRACE
	WHERE RaceId IN(SELECT deleted.ID FROM deleted)
	DELETE
	FROM BANK_ACCOUNT
	WHERE Race_ID IN(SELECT deleted.ID FROM deleted)
	DELETE
	FROM JOIN_RACE
	WHERE Race_ID IN(SELECT deleted.ID FROM deleted)
	DELETE
	FROM RACE
	WHERE ID IN(SELECT deleted.ID FROM deleted)	
END
GO

CREATE TRIGGER DeleteChallengeTrigger
ON [ChallengesandActivities]
INSTEAD OF DELETE 
AS
BEGIN
	DELETE
	FROM JOIN_CHALLENGE
	WHERE Challenge_ID IN(SELECT deleted.Id FROM deleted)
	DELETE
	FROM CHALLENGE
	WHERE Id IN(SELECT deleted.Id FROM deleted)
		
END
GO

CREATE TRIGGER DeleteActivityTrigger
ON Register
AFTER DELETE 
AS
BEGIN
	DELETE
	FROM [ChallengesandActivities]
	WHERE ActivityID IN(SELECT deleted.ActivityId FROM deleted)
	DELETE
	FROM [RacesandActivities]
	WHERE ActivityID IN(SELECT deleted.ActivityId FROM deleted)
	DELETE
	FROM ACTIVITY
	WHERE Id IN(SELECT deleted.ActivityId FROM deleted)		
END
GO
--DROP TRIGGER DeleteActivityTrigger