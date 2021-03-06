package com.example.straviatec_mobile.Utilities;

/**
 * It's a class that contains all the constants that are used in the database
 */
public class Utilities {
    public static final String TABLE_ACTIVITY = "activity";
    public static final String TABLE_ADDS = "adds";
    public static final String TABLE_BANK_ACCOUNT = "bank_account";
    public static final String TABLE_BELONGS_TO = "belongs_to";
    public static final String TABLE_CATEGORY = "category";
    public static final String TABLE_CHALLENGE = "challenge";
    public static final String TABLE_GROUP = "[group]";
    public static final String TABLE_JOIN_CHALLENGE = "join_challenge";
    public static final String TABLE_JOIN_RACE = "join_race";
    public static final String TABLE_MANAGES = "manages";
    public static final String TABLE_RACE = "race";
    public static final String TABLE_REGISTER = "register";
    public static final String TABLE_SPONSOR = "sponsor";
    public static final String TABLE_SPONSORS_RACE = "sponsors_race";
    public static final String TABLE_SPORT = "sport";
    public static final String TABLE_USER = "user";

    public static final String FIELD_ID = "Id";
    public static final String FIELD_DATE = "Date";
    public static final String FIELD_DURATION = "Duration";
    public static final String FIELD_MILEAGE = "Mileage";
    public static final String FIELD_ROUTE = "Route";
    public static final String FIELD_SPORTNAME = "SportName";
    public static final String FIELD_USERNAME = "UserName";
    public static final String FIELD_FRIENDUSERNAME = "FriendUserName";
    public static final String FIELD_RACEID = "Race_ID";
    public static final String FIELD_ACCOUNT = "Account";
    public static final String FIELD_GROUPID = "GroupId";
    public static final String FIELD_NAME = "Name";
    public static final String FIELD_DESCRIPTION = "Description";
    public static final String FIELD_VALIDTHRU = "ValidThru";
    public static final String FIELD_TYPE = "Type";
    public static final String FIELD_ACCESS = "Access";
    public static final String FIELD_ACTIVITYID = "ActivityId";
    public static final String FIELD_CATEGORYNAME = "CategoryName";
    public static final String FIELD_CHALLENGEID = "Challenge_ID";
    public static final String FIELD_COST = "Cost";
    public static final String FIELD_COMERCIALNAME = "ComercialName";
    public static final String FIELD_LOGO = "Logo";
    public static final String FIELD_AGENTNUMBER = "AgentNumber";
    public static final String FIELD_FNAME = "first_name";
    public static final String FIELD_SNAME = "second_name";
    public static final String FIELD_FSNAME = "first_surname";
    public static final String FIELD_SSNAME = "second_surname";
    public static final String FIELD_SPONSORID = "SponsorId";
    public static final String FIELD_PASS = "password";
    public static final String FIELD_LEVEL = "Level";
    public static final String FIELD_PROFILEPIC= "ProfilePicture";
    public static final String FIELD_BDATE = "BirthDate";
    public static final String FIELD_NATION = "Nationality";

    public static final String CREATE_ACTIVITY_TABLE = "CREATE TABLE "+TABLE_ACTIVITY+" ("+FIELD_USERNAME+" TEXT, "+FIELD_ID+" INTEGER, "+FIELD_DATE+" TEXT, "+FIELD_DURATION+" TEXT, "+FIELD_MILEAGE+" INTEGER, "+FIELD_ROUTE+" TEXT, "+FIELD_SPORTNAME+" TEXT)";
    public static final String CREATE_ADDS_TABLE = "CREATE TABLE "+TABLE_ADDS+" ("+FIELD_USERNAME+" TEXT, "+FIELD_FRIENDUSERNAME+" TEXT)";
    public static final String CREATE_BANKACCOUNT_TABLE = "CREATE TABLE "+TABLE_BANK_ACCOUNT+" ("+FIELD_RACEID+" INTEGER, "+FIELD_ACCOUNT+" INTEGER)";
    public static final String CREATE_BELONGSTO_TABLE = "CREATE TABLE "+TABLE_BELONGS_TO+" ("+FIELD_USERNAME+" TEXT, "+FIELD_GROUPID+" TEXT)";
    public static final String CREATE_CATEGORY_TABLE = "CREATE TABLE "+TABLE_CATEGORY+" ("+FIELD_NAME+" TEXT, "+FIELD_DESCRIPTION+" TEXT)";
    public static final String CREATE_CHALLENGE_TABLE = "CREATE TABLE "+TABLE_CHALLENGE+" ("+FIELD_ID+" INTEGER, "+FIELD_VALIDTHRU+" TEXT, "+FIELD_TYPE+" TEXT, "+FIELD_ACCESS+" TEXT, "+FIELD_NAME+" TEXT, "+FIELD_ACTIVITYID+" INT)";
    public static final String CREATE_GROUP_TABLE = "CREATE TABLE "+TABLE_GROUP+" ("+FIELD_NAME+" TEXT, "+FIELD_DESCRIPTION+" TEXT)";
    public static final String CREATE_JOINCHALLENGE_TABLE = "CREATE TABLE "+TABLE_JOIN_CHALLENGE+" ("+FIELD_USERNAME+" TEXT, "+FIELD_CHALLENGEID+" INT)";
    public static final String CREATE_JOINRACE_TABLE = "CREATE TABLE "+TABLE_JOIN_RACE+" ("+FIELD_USERNAME+" TEXT, "+FIELD_RACEID+" INT)";
    public static final String CREATE_MANAGES_TABLE = "CREATE TABLE "+TABLE_MANAGES+" ("+FIELD_USERNAME+" TEXT, "+FIELD_GROUPID+" TEXT)";
    public static final String CREATE_RACE_TABLE = "CREATE TABLE "+TABLE_RACE+" ("+FIELD_ID+" INTEGER, "+FIELD_NAME+" TEXT, "+FIELD_COST+" INTEGER, "+FIELD_DATE+" TEXT, "+FIELD_ACCESS+" TEXT, "+FIELD_ACTIVITYID+" INT, "+FIELD_CATEGORYNAME+" TEXT)";
    public static final String CREATE_USER_TABLE = "CREATE TABLE "+TABLE_USER+" ("+FIELD_USERNAME+" TEXT, "+FIELD_FNAME+" TEXT, "+FIELD_SNAME+" TEXT, "+FIELD_FSNAME+" TEXT, "+FIELD_SSNAME+" TEXT, "+FIELD_LEVEL+" TEXT, "+FIELD_PROFILEPIC+" BLOB, "+FIELD_BDATE+" TEXT, "+FIELD_PASS+" TEXT, "+FIELD_NATION+" TEXT)";
    public static final String CREATE_REGISTER_TABLE =  "CREATE TABLE "+TABLE_REGISTER+" ("+FIELD_USERNAME+" TEXT, "+FIELD_ACTIVITYID+" INTEGER)";
    public static final String CREATE_SPONSOR_TABLE = "CREATE TABLE "+TABLE_SPONSOR+" ("+FIELD_ID+" INT, "+FIELD_COMERCIALNAME+" TEXT, "+FIELD_LOGO+" BLOB, "+FIELD_AGENTNUMBER+" INT, "+FIELD_FNAME+" TEXT, "+FIELD_SNAME+" TEXT, "+FIELD_FSNAME+" TEXT, "+FIELD_SSNAME+" TEXT)";
    public static final String CREATE_SPONSORRACE_TABLE = "CREATE TABLE "+TABLE_SPONSORS_RACE+" ("+FIELD_RACEID+" INTEGER, "+FIELD_SPONSORID+" INTEGER)";
    public static final String CREATE_SPORT_TABLE = "CREATE TABLE "+TABLE_SPORT+" ("+FIELD_NAME+" TEXT, "+FIELD_DESCRIPTION+" TEXT)";
}
