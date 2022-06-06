package com.example.straviatec_mobile.Interfaces;

import com.example.straviatec_mobile.Entities.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

// A method that is used to get the data from the server.
public interface UserAPI {

   /**
    * This function will return a list of users from the server.
    * 
    * @return A list of User objects.
    */
    @GET("api/User")
    Call<List<User>> findU();
}
