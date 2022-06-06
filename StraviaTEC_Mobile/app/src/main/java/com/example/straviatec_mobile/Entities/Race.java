package com.example.straviatec_mobile.Entities;

import java.io.Serializable;
/**
 * This class manages the Race Class
 * @author Dennis Jimenez
 */
public class Race implements Serializable {

    private Integer id;
    private String name;
    private Integer cost;
    private String date;
    private String access;
    private Integer activityID;
    private String categoryName;

    /**
     * Empty constructor
     */
    public Race(){}

    /**
     * Constructor for the Race Class
     * @param id race id
     * @param name race name
     * @param cost race cost
     * @param date date
     * @param access access
     * @param activityID id of related activity
     * @param categoryName name of category
     */
    public Race(Integer id, String name, Integer cost, String date, String access, Integer activityID, String categoryName) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.date = date;
        this.access = access;
        this.activityID = activityID;
        this.categoryName = categoryName;
    }

   /**
    * This function returns the id of the object
    * 
    * @return The id of the object.
    */
    public Integer getId() {
        return id;
    }

    /**
     * This function sets the id of the object to the id passed in as a parameter
     * 
     * @param id The id of the user
     */
    public void setId(Integer id) {
        this.id = id;
    }

   /**
    * This function returns the name of the person
    * 
    * @return The name of the person.
    */
    public String getName() {
        return name;
    }

    /**
     * This function sets the name of the object to the name passed in as a parameter
     * 
     * @param name The name of the parameter.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This function returns the cost of the item
     * 
     * @return The cost of the item.
     */
    public Integer getCost() {
        return cost;
    }

    /**
     * This function sets the cost of the item
     * 
     * @param cost The cost of the item.
     */
    public void setCost(Integer cost) {
        this.cost = cost;
    }

    /**
     * This function returns the date of the event
     * 
     * @return The date.
     */
    public String getDate() {
        return date;
    }

    /**
     * This function sets the date of the event
     * 
     * @param date The date of the event
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * This function returns the access level of the current user
     * 
     * @return The access variable is being returned.
     */
    public String getAccess() {
        return access;
    }

    /**
     * This function sets the access of the current object to the value of the parameter access
     * 
     * @param access The access level of the user.
     */
    public void setAccess(String access) {
        this.access = access;
    }

    /**
     * This function returns the activityID of the activity
     * 
     * @return The activityID is being returned.
     */
    public Integer getActivityID() {
        return activityID;
    }

    /**
     * This function sets the activityID of the activity to the activityID passed in as a parameter
     * 
     * @param activityID The ID of the activity
     */
    public void setActivityID(Integer activityID) {
        this.activityID = activityID;
    }

    /**
     * This function returns the name of the category
     * 
     * @return The categoryName is being returned.
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * This function sets the category name
     * 
     * @param categoryName The name of the category.
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
