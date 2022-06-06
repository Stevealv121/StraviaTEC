package com.example.straviatec_mobile.Entities;
/**
 * This class manages the class Challenge
 * @author Dennis Jimenez
 */
public class Challenge {

    private Integer id;
    private String validThru;
    private String type;
    private String access;
    private String name;
    private Integer activityId;

    /**
     * Constructor for challenge
     * @param id challenge id
     * @param validThru completion period
     * @param type type of challenge
     * @param access access type
     * @param name name
     * @param activityId id of related activity
     */
    public Challenge(Integer id, String validThru, String type, String access, String name, Integer activityId) {
        this.id = id;
        this.validThru = validThru;
        this.type = type;
        this.access = access;
        this.name = name;
        this.activityId = activityId;
    }

    /**
     * empty constructor
     */
    public Challenge(){}

    /**
     * Gets the id
     * @return integer with id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the id
     * @param id int with the id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets the period
     * @return string with the period
     */
    public String getValidThru() {
        return validThru;
    }

    /**
     * Sets the period
     * @param validThru string with the period
     */
    public void setValidThru(String validThru) {
        this.validThru = validThru;
    }

    /**
     * Gets the type
     * @return string with the type
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the type
     * @param type string with the type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Gets the access
     * @return string with the access
     */
    public String getAccess() {
        return access;
    }

    /**
     * Sets the access
     * @param access string with the access
     */
    public void setAccess(String access) {
        this.access = access;
    }

    /**
     * Gets the name
     * @return string with the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name
     * @param name string with the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the activity
     * @return int with the activity id
     */
    public Integer getActivityId() {
        return activityId;
    }

    /**
     * Sets the activity id
     * @param activityId int with the activity id
     */
    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }
}
