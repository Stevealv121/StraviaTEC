package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Challenge;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

// A Retrofit interface.
public interface ChallengeAPI {

    /**
     * This function will return a list of Challenge objects from the API
     * 
     * @return A list of Challenge objects.
     */
    @GET("api/Challenge")
    Call<List<Challenge>> findC();



}
