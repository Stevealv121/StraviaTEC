package com.example.straviatec_mobile;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationListener;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import java.io.StringReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

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
    private Polyline track;
    private LatLng mylocation;
    private final List<Location> trkpoints = new ArrayList<>();

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
        PolylineOptions polylineOptions = new PolylineOptions();
        polylineOptions.color(Color.RED);
        polylineOptions.width(10);
        track = nMap.addPolyline(polylineOptions);
        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(@NonNull Location location) {
                if(running){
                    try {
                        mylocation = new LatLng(location.getLatitude(),location.getLongitude());
                        updateTrack();
                        nMap.moveCamera(CameraUpdateFactory.newLatLngZoom(mylocation, 20));
                        trkpoints.add(location);
                    }catch(SecurityException ex){
                        ex.printStackTrace();
                    }
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
        track.remove();
        Document doc = toXMLfromString(generateRouteGPX("gpx test",trkpoints));
        assert doc != null;
        //Log.d("Gpx content", doc.getFirstChild().getNodeName());
        Intent myintent = new Intent(Map.this,ActivitySetup.class);
        startActivity(myintent);
    }

    private void updateTrack(){
        List<LatLng> points = track.getPoints();
        points.add(mylocation);
        track.setPoints(points);
    }

    private String generateRouteGPX(String name, List<Location> points){
        String result;
        String header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?><gpx xmlns=\"http://www.topografix.com/GPX/1/1\" creator=\"MapSource 6.15.5\" version=\"1.1\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"  xsi:schemaLocation=\"http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd\"><trk>\n";
        name = "<name>" + name + "</name><trkseg>\n";
        String segments = "";
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        for (Location location : points) {
            segments += "<trkpt lat=\"" + location.getLatitude() + "\" lon=\"" + location.getLongitude() + "\"><time>" + df.format(new Date(location.getTime())) + "</time></trkpt>\n";
        }

        String footer = "</trkseg></trk></gpx>";
        result = header + name + segments + footer;
        return result;
    }

    private Document toXMLfromString(String str){
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = null;
        try{
            builder = factory.newDocumentBuilder();
            return builder.parse(new InputSource(new StringReader(str)));
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return null;
    }
}