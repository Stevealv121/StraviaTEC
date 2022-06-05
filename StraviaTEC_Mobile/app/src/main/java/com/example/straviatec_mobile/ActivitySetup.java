package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.straviatec_mobile.Entities.Challenge;
import com.example.straviatec_mobile.Entities.Race;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ActivitySetup extends AppCompatActivity {

    private Spinner activities;
    String username;
    String ssport, srace, schallege;
    ArrayList<String> showRaces, ShowChallenges;
    ArrayList<Challenge> challengelist;
    ArrayList<Race> racelist;
    boolean sportSelected = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setup);

        Intent rintent = getIntent();
        username = rintent.getStringExtra("uname");

        consultRA();
        consultCH();

        activities = findViewById(R.id.activities);
        List<String> states = Arrays.asList("Select Sport or Activity","Running","Swimming","Cycling","Trekking","Kayak","Hiking");
        ArrayAdapter adapter = new ArrayAdapter(getApplicationContext(), android.R.layout.simple_spinner_item,states);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        activities.setAdapter(adapter);
        activities.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                if(i!=0){
                    ssport = states.get(i);
                    sportSelected = true;
                }
                else{
                    sportSelected = false;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    private void consultCH() {
    }

    private void consultRA() {
    }

    public void onClick(View view) {
        if(sportSelected){
            Log.e("Sport Selected", ssport);
            Intent myintent = new Intent(ActivitySetup.this,Map.class);
            startActivity(myintent);
        }else{
            Toast.makeText(ActivitySetup.this,"Sport not selected",Toast.LENGTH_SHORT).show();
        }
    }
}