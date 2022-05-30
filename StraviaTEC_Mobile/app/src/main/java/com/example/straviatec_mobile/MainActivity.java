package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Interfaces.ActivityAPI;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if(savedInstanceState == null){
            sincA();
            sincU();
        }
    }
    private void sincA() {
        SQLitehelper conn = new SQLitehelper(this, "StraviaTEC_DB", null,1);
        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).build();
        ActivityAPI activityAPI = retrofit.create(ActivityAPI.class);
        Call<List<Activity>> call = activityAPI.findA();
        call.enqueue(new Callback<List<Activity>>() {
            @Override
            public void onResponse(Call<List<Activity>> call, Response<List<Activity>> response) {
            }

            @Override
            public void onFailure(Call<List<Activity>> call, Throwable t) {

            }
        });
    }
    private void sincU() {

    }

    public void onClick(View view) {
        Intent myintent = new Intent(MainActivity.this,Menu.class);
        startActivity(myintent);
    }
}