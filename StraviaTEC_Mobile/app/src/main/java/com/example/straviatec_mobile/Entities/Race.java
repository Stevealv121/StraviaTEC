package com.example.straviatec_mobile.Entities;

public class Race {

    private Integer id;
    private String name;
    private Integer cost;
    private String date;
    private String access;
    private Integer activityID;
    private String categoryName;

    public Race(){}

    public Race(Integer id, String name, Integer cost, String date, String access, Integer activityID, String categoryName) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.date = date;
        this.access = access;
        this.activityID = activityID;
        this.categoryName = categoryName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }

    public Integer getActivityID() {
        return activityID;
    }

    public void setActivityID(Integer activityID) {
        this.activityID = activityID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
