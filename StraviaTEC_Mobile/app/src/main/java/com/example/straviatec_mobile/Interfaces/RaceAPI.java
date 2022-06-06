package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Race;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;

// A Java interface that is used to define the methods that will be used to make the API calls.
public interface RaceAPI {

    /**
     * This function will return a list of Race objects from the API
     * 
     * @return A list of Race objects.
     */
    @GET("api/Race")
    Call<List<Race>> findR();

    /**
     * This function will return a list of races that are associated with the user whose username is
     * passed in as a parameter.
     * 
     * @param uname the username of the user
     * @return A list of races
     */
    @GET("api/Race/ByUserName/{Username}")
    Call<List<Race>> findRU(@Path("Username") String uname);


}
