package com.example.straviatec_mobile.Entities;

import java.util.Date;

/**
 * It's a class that represents a user
 */
public class User {
    private String userName;
    private String firstName;
    private String secondName;
    private String firstSurname;
    private String secondSurname;
    private String password;
    private String level;
    private String profilePicture;
    private String birthDate;
    private String nationality;

    // It's a constructor.
    public User(String userName, String firstName, String secondName, String firstSurname, String secondSurname, String password, String level, String profilePicture, String birthDate, String nationality) {
        this.userName = userName;
        this.firstName = firstName;
        this.secondName = secondName;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
        this.password = password;
        this.level = level;
        this.profilePicture = profilePicture;
        this.birthDate = birthDate;
        this.nationality = nationality;
    }

    public User(){}

   /**
    * This function returns the userName of the user
    * 
    * @return The userName variable is being returned.
    */
    public String getUserName() {
        return userName;
    }

    /**
     * This function sets the userName variable to the value of the userName parameter
     * 
     * @param userName The name of the user.
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

   /**
    * This function returns the first name of the person
    * 
    * @return The first name of the person.
    */
    public String getFirstName() {
        return firstName;
    }

    /**
     * This function sets the first name of the person
     * 
     * @param firstName The first name of the user.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * This function returns the second name of the person
     * 
     * @return The secondName variable is being returned.
     */
    public String getSecondName() {
        return secondName;
    }

    /**
     * This function sets the second name of the person
     * 
     * @param secondName The second name of the person.
     */
    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    /**
     * This function returns the firstSurname variable
     * 
     * @return The firstSurname variable is being returned.
     */
    public String getFirstSurname() {
        return firstSurname;
    }

    /**
     * This function sets the firstSurname variable to the value of the firstSurname parameter
     * 
     * @param firstSurname The first surname of the person.
     */
    public void setFirstSurname(String firstSurname) {
        this.firstSurname = firstSurname;
    }

    /**
     * This function returns the second surname of the person
     * 
     * @return The secondSurname variable is being returned.
     */
    public String getSecondSurname() {
        return secondSurname;
    }

    /**
     * This function sets the second surname of the person
     * 
     * @param secondSurname String
     */
    public void setSecondSurname(String secondSurname) {
        this.secondSurname = secondSurname;
    }

   /**
    * This function returns the password of the user
    * 
    * @return The password.
    */
    public String getPassword() {
        return password;
    }

    /**
     * This function sets the password of the user
     * 
     * @param password The password to use for the connection.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * This function returns the level of the user
     * 
     * @return The level of the user.
     */
    public String getLevel() {
        return level;
    }

    /**
     * This function sets the level of the game
     * 
     * @param level The level of the log message.
     */
    public void setLevel(String level) {
        this.level = level;
    }

    /**
     * This function returns the profile picture of the user
     * 
     * @return The profile picture of the user.
     */
    public String getProfilePicture() {
        return profilePicture;
    }

    /**
     * This function sets the profile picture of the user
     * 
     * @param profilePicture The URL of the profile picture.
     */
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    /**
     * This function returns the birth date of the person
     * 
     * @return The birthDate variable is being returned.
     */
    public String getBirthDate() {
        return birthDate;
    }

    /**
     * This function sets the birthDate of the person
     * 
     * @param birthDate The date of birth of the user.
     */
    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    /**
     * This function returns the nationality of the person
     * 
     * @return The nationality of the person.
     */
    public String getNationality() {
        return nationality;
    }

   /**
    * This function sets the nationality of the person
    * 
    * @param nationality The nationality of the person.
    */
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
