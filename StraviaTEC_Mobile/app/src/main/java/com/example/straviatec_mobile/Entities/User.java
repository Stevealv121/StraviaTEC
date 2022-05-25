package com.example.straviatec_mobile.Entities;

import android.media.Image;

public class User {
    private String UserName;
    private String first_name;
    private String second_name;
    private String first_surname;
    private String second_surname;
    private String Level;
    private Image ProfilePicture;
    private String password;

    public User(String userName, String first_name, String second_name, String first_surname, String second_surname, String level, Image profilePicture, String password) {
        UserName = userName;
        this.first_name = first_name;
        this.second_name = second_name;
        this.first_surname = first_surname;
        this.second_surname = second_surname;
        Level = level;
        ProfilePicture = profilePicture;
        this.password = password;
    }

    public User(){}

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getSecond_name() {
        return second_name;
    }

    public void setSecond_name(String second_name) {
        this.second_name = second_name;
    }

    public String getFirst_surname() {
        return first_surname;
    }

    public void setFirst_surname(String first_surname) {
        this.first_surname = first_surname;
    }

    public String getSecond_surname() {
        return second_surname;
    }

    public void setSecond_surname(String second_surname) {
        this.second_surname = second_surname;
    }

    public String getLevel() {
        return Level;
    }

    public void setLevel(String level) {
        Level = level;
    }

    public Image getProfilePicture() {
        return ProfilePicture;
    }

    public void setProfilePicture(Image profilePicture) {
        ProfilePicture = profilePicture;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
