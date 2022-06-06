INSERT INTO ACTIVITY(Date,Duration,Mileage,Route,SportName)
	VALUES 
		('2022-06-01','02:02:02',12,NULL,'Running'),
		('2022-06-02','12:02:02',22,NULL,'Running'),
		('2022-06-03','19:02:02',32,NULL,'Running'),
		('2022-06-04','15:02:02',42,NULL,'Running');

INSERT INTO RACE(Name,Cost,Date,Access,ActivityID,CategoryName)
	VALUES
		('Race1',99,'2022-06-12','public',1,'Junior'),
		('Race2',116,'2022-06-22','public',2,'Junior');

INSERT INTO CHALLENGE(ValidThru,Type,Access,Name,ActivityId)
	VALUES
		('2022-06-07','type1','public','Challenge1',3),
		('2022-06-08','type2','public','Challenge2',4);

