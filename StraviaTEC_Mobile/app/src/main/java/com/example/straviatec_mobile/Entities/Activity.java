package com.example.straviatec_mobile.Entities;


public class Activity {
    private Integer id;
    private String date;
    private Integer duration;
    private Integer mileage;
    private String route;
    private String sport_name;

    public Activity(Integer id, String date, Integer duration, Integer mileage, String route, String sport_name) {
        this.id = id;
        this.date = date;
        this.duration = duration;
        this.mileage = mileage;
        this.route = route;
        this.sport_name = sport_name;
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

    public String getSport_name() {
        return sport_name;
    }

    public void setSport_name(String sport_name) {
        this.sport_name = sport_name;
    }
}
