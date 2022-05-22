package com.example.straviatec_mobile;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;

public class Map extends AppCompatActivity implements OnMapReadyCallback{

    SupportMapFragment mapFragment;
    private Chronometer chronometer;
    private boolean running;
    private long offset;
    private Button start,stop,resume;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        chronometer = findViewById(R.id.chronometer);
        start = findViewById(R.id.start);
        stop = findViewById(R.id.stop);
        resume = findViewById(R.id.resume);
        mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        stop.setVisibility(View.INVISIBLE);
        resume.setVisibility(View.INVISIBLE);


    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {

    }

    public void startActivity(View view) {
        if(!running){
            chronometer.setBase(SystemClock.elapsedRealtime());
            chronometer.start();
            running = true;
            start.setVisibility(View.INVISIBLE);
            stop.setVisibility(View.VISIBLE);
            resume.setVisibility(View.VISIBLE);
        }
    }

    public void stopActivity(View view) {
        if(running){
            chronometer.stop();
            offset = SystemClock.elapsedRealtime() - chronometer.getBase();
            running = false;
        }
    }

    public void resumeActivity(View view) {
        if(!running){
            chronometer.setBase(SystemClock.elapsedRealtime() - offset);
            chronometer.start();
            running = true;
        }
    }

    public void finishActivity(View view) {
        Intent myintent = new Intent(Map.this,ActivitySetup.class);
        startActivity(myintent);
    }
}