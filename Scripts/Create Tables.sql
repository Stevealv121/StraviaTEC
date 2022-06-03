USE StraviaTEC;
CREATE TABLE [USER](UserName VARCHAR(15) NOT NULL,
					FirstName VARCHAR(15) NOT NULL,
					SecondName VARCHAR(15),
					FirstSurname VARCHAR(15) NOT NULL,
					SecondSurname VARCHAR(15),
					[Password] VARCHAR(15) NOT NULL,
					[Level] VARCHAR(15) NOT NULL,
					ProfilePicture IMAGE,
					BirthDate DATE NOT NULL,
					Nationality VARCHAR (15)
					);

CREATE TABLE MANAGES (
	UserName VARCHAR(15) NOT NULL,
	GroupID VARCHAR(15) NOT NULL
);

CREATE TABLE [GROUP] (
	[Name] VARCHAR(15) NOT NULL,
	[Description] VARCHAR(32) NOT NULL
);

CREATE TABLE JOIN_CHALLENGE (
	UserName VARCHAR(15) NOT NULL,
	Challenge_ID INT NOT NULL
);

CREATE TABLE JOIN_RACE (
	UserName VARCHAR(15) NOT NULL,
	Race_ID INT NOT NULL,
	Bill IMAGE NOT NULL,
	Activityid INT NOT NULL
);

CREATE TABLE BANK_ACCOUNT (
	Race_ID INT NOT NULL,
	Account BIGINT NOT NULL
);

CREATE TABLE RACE(ID INT IDENTITY(1,1) NOT NULL,
                  [Name] VARCHAR(15) NOT NULL,
				  Cost INT NOT NULL,
				  [Date] DATE NOT NULL,
				  Access VARCHAR(15) NOT NULL,
				  ActivityID INT NOT NULL,
				  CategoryName VARCHAR(15) NOT NULL
				);

CREATE TABLE SPORT([Name] VARCHAR(15) NOT NULL,
                   [Description] VARCHAR(32) NOT NULL
					);

CREATE TABLE SPONSOR(
	Id INT IDENTITY(1,1) NOT NULL,
	ComercialName VARCHAR(15) NOT NULL,
	Logo IMAGE,
	AgentNumber INT NOT NULL,
	FirstName VARCHAR(15) NOT NULL,
	SecondName VARCHAR(15),
	FirstSurname VARCHAR(15) NOT NULL,
	SecondSurname VARCHAR(15)
	);

CREATE TABLE CATEGORY([Name] VARCHAR(15) NOT NULL,
					[Description] VARCHAR(15) NOT NULL,
					MinAge INT,
					MaxAge INT
					
					);

CREATE TABLE CHALLENGE(Id INT IDENTITY(1,1) NOT NULL ,
					ValidThru DATE NOT NULL,
					[Type] VARCHAR(15) NOT NULL,
					[Access] VARCHAR(15) NOT NULL,
					[Name] VARCHAR(15) NOT NULL,
					ActivityId INT NOT NULL
					);

CREATE TABLE ACTIVITY(Id INT IDENTITY(1,1) NOT NULL,
					[Date] DATE NOT NULL,
					Duration TIME NOT NULL,
					Mileage INT,
					[Route] VARBINARY(MAX),
					SportName VARCHAR(15)
					);

CREATE TABLE Register(UserName VARCHAR(15) NOT NULL,
					ActivityId INT NOT NULL
					);

CREATE TABLE Adds(UserName VARCHAR(15) NOT NULL,
                  FriendUserName VARCHAR(15) NOT NULL
);

CREATE TABLE SponsorsRACE(
	RaceId INT NOT NULL,
	SponsorId INT NOT NULL
	);

CREATE TABLE BelongsTo(
	UserName VARCHAR(15) NOT NULL,
	GroupId VARCHAR(15) NOT NULL
	);

ALTER TABLE SPONSOR
ADD CONSTRAINT IdSPK PRIMARY KEY(Id);

ALTER TABLE SPORT
ADD CONSTRAINT NameSPK PRIMARY KEY([Name]);

ALTER TABLE [GROUP]
ADD CONSTRAINT NAME_PK PRIMARY KEY ([Name]);

ALTER TABLE [USER]
ADD CONSTRAINT UserNamePK PRIMARY KEY(UserName);

ALTER TABLE CATEGORY
ADD CONSTRAINT NameCPK PRIMARY KEY([Name]);

ALTER TABLE ACTIVITY
ADD CONSTRAINT SPORTFK FOREIGN KEY(SportName)
REFERENCES [Sport]([Name]),
CONSTRAINT IdAPK PRIMARY KEY(Id);

ALTER TABLE RACE
ADD CONSTRAINT ACTIVITYIDRFK FOREIGN KEY(ActivityID)
REFERENCES ACTIVITY(Id),
CONSTRAINT CATEGORYFK FOREIGN KEY(CategoryName)
REFERENCES [Category]([Name]),
CONSTRAINT IdRPK PRIMARY KEY(ID);

ALTER TABLE CHALLENGE
ADD CONSTRAINT ACTIVITYIDCFK FOREIGN KEY(ActivityId)
REFERENCES [ACTIVITY](Id),
CONSTRAINT IdCPK PRIMARY KEY(Id);

ALTER TABLE Adds
ADD CONSTRAINT USERNAMEFK FOREIGN KEY(UserName)
REFERENCES [USER](UserName),
CONSTRAINT FRIENDUSERNAMEFK FOREIGN KEY(FriendUserName)
REFERENCES [USER](UserName),
CONSTRAINT AddsPK PRIMARY KEY(UserName, FriendUserName);

ALTER TABLE SponsorsRACE
ADD CONSTRAINT RACEIDFK FOREIGN KEY(RaceId)
REFERENCES RACE(Id),
CONSTRAINT SPONSORIDFK FOREIGN KEY(SponsorId)
REFERENCES SPONSOR(Id),
CONSTRAINT SponsorsPK PRIMARY KEY(RaceId, SponsorId);

ALTER TABLE BelongsTo
ADD CONSTRAINT USERNAMEBFK FOREIGN KEY(UserName)
REFERENCES [USER](UserName),
CONSTRAINT GROUPIDFK FOREIGN KEY(GroupId)
REFERENCES [GROUP]([Name]),
CONSTRAINT GroupsPK PRIMARY KEY(UserName, GroupId);

ALTER TABLE Register
ADD CONSTRAINT USERNAMERFK FOREIGN KEY(UserName)
REFERENCES [USER](UserName),
CONSTRAINT ACTIVITYIDFK FOREIGN KEY(ActivityId)
REFERENCES [ACTIVITY](Id),
CONSTRAINT RegisterPK PRIMARY KEY(UserName, ActivityId);

ALTER TABLE MANAGES 
ADD CONSTRAINT MANAGES_PK PRIMARY KEY (UserName,GroupID),
CONSTRAINT UserNameM_FK FOREIGN KEY (UserName)
REFERENCES [USER](UserName),
CONSTRAINT GROUPM_FK FOREIGN KEY (GroupID)
REFERENCES [GROUP]([Name]);

ALTER TABLE JOIN_CHALLENGE
ADD CONSTRAINT JOIN_CHALLENGE_PK PRIMARY KEY (UserName,Challenge_ID),
CONSTRAINT UserNameC_FK FOREIGN KEY (UserName)
REFERENCES [USER](UserName),
CONSTRAINT CHALLENGEFK FOREIGN KEY (Challenge_ID)
REFERENCES CHALLENGE(Id);

ALTER TABLE JOIN_RACE
ADD CONSTRAINT JOIN_RACE_PK PRIMARY KEY (UserName,Race_ID),
CONSTRAINT UserNameR_FK FOREIGN KEY (UserName)
REFERENCES [USER](UserName),
CONSTRAINT RACEFK FOREIGN KEY (Race_ID)
REFERENCES RACE(Id),
CONSTRAINT ACTIDFK FOREIGN KEY (Activityid)
REFERENCES [ACTIVITY](Id);

ALTER TABLE BANK_ACCOUNT
ADD CONSTRAINT BANK_ACCOUNT_PK PRIMARY KEY (Race_ID, Account),
CONSTRAINT RACE_ID_FK FOREIGN KEY (Race_ID)
REFERENCES RACE(Id);