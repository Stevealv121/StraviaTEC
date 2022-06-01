package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Entities.User;
import com.example.straviatec_mobile.Interfaces.ActivityAPI;
import com.example.straviatec_mobile.Interfaces.UserAPI;
import com.example.straviatec_mobile.Utilities.Utilities;

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
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).build();
        ActivityAPI activityAPI = retrofit.create(ActivityAPI.class);
        Call<List<Activity>> call = activityAPI.findA();
        call.enqueue(new Callback<List<Activity>>() {
            @Override
            public void onResponse(Call<List<Activity>> call, Response<List<Activity>> response) {
                try{
                    List<Activity> activityList = response.body();
                    for(Activity a: activityList){
                        SQLiteDatabase db = conn.getWritableDatabase();
                        ContentValues values = new ContentValues();
                        values.put(Utilities.FIELD_USERNAME, a.getUsername());
                        values.put(Utilities.FIELD_ID, a.getId());
                        values.put(Utilities.FIELD_DATE, a.getDate());
                        values.put(Utilities.FIELD_DURATION, a.getDuration());
                        values.put(Utilities.FIELD_MILEAGE, a.getMileage());
                        values.put(Utilities.FIELD_ROUTE, a.getRoute());
                        values.put(Utilities.FIELD_SPORTNAME, a.getSportName());

                        db.insert(Utilities.TABLE_ACTIVITY, null, values);
                        db.close();
                    }
                }catch(Exception ex){
                    Toast.makeText(MainActivity.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Activity>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });
    }
    private void sincU() {
        SQLitehelper conn = new SQLitehelper(this,"StraviaTEC_DB",null,1);
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).build();
        UserAPI userAPI = retrofit.create(UserAPI.class);
        Call<List<User>> call = userAPI.findU();
        call.enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                try{
                    List<User> userList = response.body();
                    for(User u: userList){
                        SQLiteDatabase db = conn.getWritableDatabase();
                        ContentValues values = new ContentValues();
                        values.put(Utilities.FIELD_USERNAME, u.getUserName());
                        values.put(Utilities.FIELD_FNAME, u.getFirstName());
                        values.put(Utilities.FIELD_SNAME, u.getSecondName());
                        values.put(Utilities.FIELD_FSNAME, u.getFirstSurname());
                        values.put(Utilities.FIELD_SSNAME, u.getSecondSurname());
                        values.put(Utilities.FIELD_PASS, u.getPassword());
                        values.put(Utilities.FIELD_LEVEL, u.getLevel());
                        values.put(Utilities.FIELD_PROFILEPIC, u.getProfilePicture());

                        db.insert(Utilities.TABLE_USER, null,values);
                        db.close();
                    }
                }catch(Exception ex){
                    Toast.makeText(MainActivity.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error:", t.toString());
            }
        });

    }

    public void onClick(View view) {
        Intent myintent = new Intent(MainActivity.this,Menu.class);
        startActivity(myintent);
    }



}