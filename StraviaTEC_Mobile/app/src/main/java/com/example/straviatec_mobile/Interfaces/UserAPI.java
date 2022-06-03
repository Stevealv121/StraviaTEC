package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface UserAPI {

    @GET("api/User")
    Call<List<User>> findU();
}
