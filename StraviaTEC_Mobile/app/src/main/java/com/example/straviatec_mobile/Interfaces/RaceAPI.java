package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.Race;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface RaceAPI {

    @GET("api/Race")
    Call<List<Race>> findR();

    @GET("api/Race/ByUserName/{Username}")
    Call<List<Race>> findRU(@Path("Username") String uname);

}
