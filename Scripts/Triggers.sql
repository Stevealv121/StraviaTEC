CREATE TRIGGER DeleteGroupTrigger
ON Manages
FOR DELETE 
AS
BEGIN
	DELETE
	FROM BelongsTo
	WHERE GroupId IN(SELECT deleted.GroupId FROM deleted)
	DELETE
	FROM [GROUP]
	WHERE [Name] IN(SELECT deleted.GroupId FROM deleted) 
	
END
GO
--DROP TRIGGER DeleteGroupTrigger
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
ON [RaceChallengeActivity]
INSTEAD OF DELETE 
AS
BEGIN
	DELETE
	FROM SponsorsRACE
	WHERE RaceId IN(SELECT deleted.RaceID FROM deleted)
	DELETE
	FROM BANK_ACCOUNT
	WHERE Race_ID IN(SELECT deleted.RaceID FROM deleted)
	DELETE
	FROM JOIN_RACE
	WHERE Race_ID IN(SELECT deleted.RaceID FROM deleted)
	DELETE
	FROM RACE
	WHERE ID IN(SELECT deleted.RaceID FROM deleted)
	DELETE
	FROM JOIN_CHALLENGE
	WHERE Challenge_ID IN(SELECT deleted.ChallengeID FROM deleted)
	DELETE
	FROM CHALLENGE
	WHERE Id IN(SELECT deleted.ChallengeID FROM deleted)
	DELETE
	FROM Register
	WHERE ActivityId IN(SELECT deleted.ActivityID FROM deleted)
	DELETE
	FROM ACTIVITY
	WHERE Id IN(SELECT deleted.ActivityID FROM deleted)		
END
GO
--DROP TRIGGER DeleteActivityTrigger