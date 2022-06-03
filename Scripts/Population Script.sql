INSERT INTO CATEGORY(Name,Description)
VALUES ('Junior','Less than 15yo',0,15),
		('Sub-23','15yo to 23yo',15,23),
		('Open','Anyone',null,null),
		('Elite','24yo to 30yo',24,30),
		('Master A','30yo to 40yo',30,40),
		('Master B','41yo to 50yo',41,50),
		('Master C','More than 51yo',51,150);

INSERT INTO SPORT(Name, Description)
VALUES ('Running','Running description'),
		('Swimming','Swimming description'),
		('Cycling','Cycling description'),
		('Hiking','Hiking description'),
		('Kayaking','Kayaking description'),
		('Walking','Walking description');

INSERT INTO SPONSOR(ComercialName, Logo, AgentNumber, FirstName, SecondName, FirstSurname, SecondSurname)
VALUES('Ford',
	(SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Users\aleji\Desktop\Wallpapers\0c32f59f324a00829dd4fa4c7c0f2223.jpg', SINGLE_BLOB) image),
	85858585,
	'Juan',
	'Fernando',
	'Perez',
	'Corrales')
	;
INSERT INTO [USER]
     VALUES
          ('nati3', 'Natalia','Angeles','Gonzalez','Bermudez',
		  '1234', '1', null, '2010-02-08', 'Costa Rica'),
		   ('sebas', 'Sebastian', 'Josue','Moya','Monge',
		   '1234', '1', null,'2000-05-10', 'Costa Rica'),
		   ('steve','Carlos','Steve','Alvarado','Mendez',
		   '1234', '1', null, '2000-05-10', 'Costa Rica'),
		   ('dennis', 'Dennis', 'Alejandro','Jimenez','Campos',
		   '1234', '1', null,'2001-05-10', 'Costa Rica')


