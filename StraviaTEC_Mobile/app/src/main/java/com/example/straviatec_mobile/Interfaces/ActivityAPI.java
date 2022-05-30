package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Entities.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ActivityAPI {

    @GET("api/Activity")
    Call<List<Activity>> findA();

    @POST("api/Activity")
    Call<Activity> postActivity(@Body Activity activity);
}
