package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Challenge;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ChallengeAPI {

    @GET("api/Challenge")
    Call<List<Challenge>> findC();

}
