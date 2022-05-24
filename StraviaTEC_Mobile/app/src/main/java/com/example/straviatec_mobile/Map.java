package com.example.straviatec_mobile;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationListener;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class Map extends AppCompatActivity implements OnMapReadyCallback {

    SupportMapFragment mapFragment;
    private Chronometer chronometer;
    private boolean running;
    private long offset;
    private Button start, stop, resume;
    private LocationListener locationListener;
    private LocationManager locationManager;
    private final long MIN_TIME = 1000;
    private final long MIN_DIST = 5;
    private GoogleMap nMap;

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

        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, PackageManager.PERMISSION_GRANTED);
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, PackageManager.PERMISSION_GRANTED);
    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        nMap = googleMap;
        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(@NonNull Location location) {
                try {
                    LatLng mylocation = new LatLng(location.getLatitude(),location.getLongitude());
                    nMap.addMarker(new MarkerOptions().position(mylocation).title("Marker in house"));
                    nMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mylocation, 20));
                }catch(SecurityException ex){
                    ex.printStackTrace();
                }
            }
            @Override
            public void onProviderEnabled(@NonNull String provider) {

            }

            @Override
            public void onProviderDisabled(@NonNull String provider) {

            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

        };
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, MIN_TIME, MIN_DIST, locationListener);
        }catch(SecurityException ex){
            ex.printStackTrace();
        }
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