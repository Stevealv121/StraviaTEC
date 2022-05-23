package com.example.straviatec_mobile;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.List;

public class Map extends AppCompatActivity implements OnMapReadyCallback, GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        com.google.android.gms.location.LocationListener {

    SupportMapFragment mapFragment;
    private Chronometer chronometer;
    private boolean running;
    private long offset;
    private Button start,stop,resume;
    private GoogleMap mMap;

    private Polyline track;
    private GoogleApiClient googleApiClient;
    private LatLng last;

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

        if (googleApiClient == null) {
            googleApiClient = new GoogleApiClient.Builder(this)
                    .addConnectionCallbacks(this)
                    .addOnConnectionFailedListener(this)
                    .addApi(LocationServices.API)
                    .build();
        }


    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {

        mMap = googleMap;
        PolylineOptions polylineOptions = new PolylineOptions();
        polylineOptions.color(Color.RED);
        polylineOptions.width(10);
        track = mMap.addPolyline(polylineOptions);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        mMap = googleMap;
        mMap.setMinZoomPreference(6.6f);
        mMap.setMaxZoomPreference(20.20f);
        mMap.setMyLocationEnabled(true);
        mMap.getUiSettings().setMyLocationButtonEnabled(true);

        LocationServices.getFusedLocationProviderClient(this).getLastLocation()
                .addOnSuccessListener(new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        if (location != null){
                            Log.i("test", "successful");

                            LatLng atual = new LatLng(location.getLatitude(), location.getLongitude());
                            mMap.addMarker(new MarkerOptions().position(atual).title("Current Location"));
                            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(atual, 15));

                        }else {
                            Log.i("teste", "unsuccessful");
                        }
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {

                    }
                });

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


    @Override
    protected void onStart() {
        googleApiClient.connect();
        super.onStart();
    }

    @Override
    protected void onStop() {
        googleApiClient.disconnect();
        super.onStop();
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopLocationUpdates();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (googleApiClient.isConnected()) {
            startLocationUpdates();
        }
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {
        if (googleApiClient.isConnected()) {
            startLocationUpdates();
        }

    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        last = new LatLng(location.getLatitude(), location.getLongitude());
        updateTrack();

    }
    protected void startLocationUpdates() {
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(15 * 1000);
        locationRequest.setFastestInterval(5 * 1000);
        locationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);


        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        LocationServices.FusedLocationApi.requestLocationUpdates(googleApiClient, locationRequest, this);
    }

    protected void stopLocationUpdates() {
        LocationServices.FusedLocationApi.removeLocationUpdates(
                googleApiClient, this);
    }

    private void updateTrack() {
        List<LatLng> points = track.getPoints();
        points.add(last);
        track.setPoints(points);

    }

}