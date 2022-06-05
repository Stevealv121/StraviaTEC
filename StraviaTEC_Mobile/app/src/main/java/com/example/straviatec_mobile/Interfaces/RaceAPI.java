package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Race;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface RaceAPI {

    @GET("api/Race")
    Call<List<Race>> findR();

}
