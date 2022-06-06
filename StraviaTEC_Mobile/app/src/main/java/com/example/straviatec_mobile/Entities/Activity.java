package com.example.straviatec_mobile.Entities;

/**
 * This class manages the class Activity
 * @author Dennis Jimenez
 */
public class Activity {
    private String username;
    private Integer id;
    private String date;
    private String duration;
    private Integer mileage;
    private String route;
    private String sportName;

    /**
     *  Constructor
     * @param username Username
     * @param id User id
     * @param date Date
     * @param duration duration of activity
     * @param mileage mileage traveled
     * @param route route
     * @param sportName Sport being practiced
     */
    public Activity(String username, Integer id, String date, String duration, Integer mileage, String route, String sportName) {
        this.username = username;
        this.id = id;
        this.date = date;
        this.duration = duration;
        this.mileage = mileage;
        this.route = route;
        this.sportName = sportName;
    }

    /**
     * Empty Constructor
     */
    public Activity(){}

    /**
     * Get for usrername
     * @return string with the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets username
     * @param username string with the username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the user id
     * @return integer with the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets the id
     * @param id integer with the id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets the date
     * @return string with the date
     */
    public String getDate() {
        return date;
    }

    /**
     * Sets the date
     * @param date string with the date
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * Gets the duration
     * @return string with the duration
     */
    public String getDuration() {
        return duration;
    }

    /**
     * Sets the duration
     * @param duration string with the duration
     */
    public void setDuration(String duration) {
        this.duration = duration;
    }

    /**
     * Gets the mileage
     * @return integer with the mileage
     */
    public Integer getMileage() {
        return mileage;
    }

    /**
     * Sets the mileage
     * @param mileage integer with the mileage
     */
    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    /**
     * Gets the route
     * @return string with the route
     */
    public String getRoute() {
        return route;
    }

    /**
     * Sets the route
     * @param route string with the route
     */
    public void setRoute(String route) {
        this.route = route;
    }

    /**
     * Gets the sport name
     * @return string with the sport name
     */
    public String getSportName() {
        return sportName;
    }

    /**
     * Sets the sport name
     * @param sportName sets the sport name
     */
    public void setSportName(String sportName) {
        this.sportName = sportName;
    }
}
