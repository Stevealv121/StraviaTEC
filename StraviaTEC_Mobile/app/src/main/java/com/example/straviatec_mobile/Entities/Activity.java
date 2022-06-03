package com.example.straviatec_mobile.Entities;


public class Activity {
    private String username;
    private Integer id;
    private String date;
    private Integer duration;
    private Integer mileage;
    private String route;
    private String sportName;

    public Activity(String username, Integer id, String date, Integer duration, Integer mileage, String route, String sportname) {
        this.username = username;
        this.id = id;
        this.date = date;
        this.duration = duration;
        this.mileage = mileage;
        this.route = route;
        this.sportName = sportname;
    }

    public Activity(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getSportName() {
        return sportName;
    }

    public void setSportName(String sportname) {
        this.sportName = sportname;
    }
}
