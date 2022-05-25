INSERT INTO CATEGORY(Name,Description)
VALUES ('Junior','Less than 15yo'),
		('Sub-23','15yo to 23yo'),
		('Open','24yo to 30yo'),
		('Elite','Anyone'),
		('Master A','30yo to 40yo'),
		('Master B','41yo to 50yo'),
		('Master C','More than 51yo');

INSERT INTO SPORT(Name, Description)
VALUES ('Running','Running description'),
		('Swimming','Swimming description'),
		('Cycling','Cycling description'),
		('Hiking','Hiking description'),
		('Kayaking','Kayaking description'),
		('Walking','Walking description');

INSERT INTO SPONSOR(ComercialName, Logo, AgentNumber, FirstName, SecondName, FirstSurname, SecondSurname)
VALUES('Ford',
	(SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Users\User\Desktop\Ford_logo_flat.svg.png', SINGLE_BLOB) image),
	85858585,
	'Juan',
	'Fernando',
	'Perez',
	'Corrales')
	;
INSERT INTO [dbo].[USER]
           ([UserName]
           ,[FirstName]
           ,[SecondName]
           ,[FirstSurname]
           ,[SecondSurname]
           ,[Password]
           ,[Level]
           ,[ProfilePicture]
           ,[BirthDate])
     VALUES
           ('nati',
		   'Natalia',
		   'Angeles',
		   'Gonzalez',
		   'Bermudez',
		   '1234',
		   '1',
		   null,
		   '2001-02-08'),
		   ('sebas',
		   'Sebastian',
		   'Josue',
		   'Moya',
		   'Monge',
		   '1234',
		   '1',
		   null,
		   '2001-05-10')