package com.example.straviatec_mobile.Entities;

public class Challenge {

    private Integer id;
    private String validThru;
    private String type;
    private String access;
    private String name;
    private Integer activityId;

    public Challenge(Integer id, String validThru, String type, String access, String name, Integer activityId) {
        this.id = id;
        this.validThru = validThru;
        this.type = type;
        this.access = access;
        this.name = name;
        this.activityId = activityId;
    }

    public Challenge(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValidThru() {
        return validThru;
    }

    public void setValidThru(String validThru) {
        this.validThru = validThru;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }
}
