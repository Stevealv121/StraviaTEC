package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Entities.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

// This is an interface that is used to make a call to the API.
public interface ActivityAPI {

    /**
     * This function will return a list of Activity objects from the server.
     * 
     * @return A list of Activity objects.
     */
    @GET("api/Activity")
    Call<List<Activity>> findA();

    /**
     * This function takes an Activity object as a parameter and returns a Call object that contains an
     * Activity object
     * 
     * @param activity The activity object to be posted.
     * @return A Call object that will be used to make the request.
     */
    @POST("api/Activity")
    Call<Activity> postActivity(@Body Activity activity);
}
