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
import android.util.Xml;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.TextView;
import android.widget.Toast;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Interfaces.ActivityAPI;
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
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.cert.CertificateException;
import java.sql.Blob;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Map extends AppCompatActivity implements OnMapReadyCallback {

    SupportMapFragment mapFragment;
    private String user, route, date, sport;
    private TextView mileage;
    private int miles;
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

        mileage = findViewById(R.id.mileage);
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
    // The above code is creating a new polyline and adding it to the map. It is also creating a new
    // location listener and adding it to the location manager.
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
                        miles += 1;
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

    /**
     * If the chronometer is not running, set the base to the current time, start the chronometer, set
     * running to true, make the start button invisible, make the stop button visible, and make the
     * resume button visible
     * 
     * @param view The view that was clicked.
     */
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

    /**
     * The function stops the chronometer and stores the time elapsed in the variable offset
     * 
     * @param view The view that was clicked.
     */
    public void stopActivity(View view) {
        if(running){
            chronometer.stop();
            offset = SystemClock.elapsedRealtime() - chronometer.getBase();
            running = false;
        }
    }

    /**
     * The function sets the chronometer's base to the current time minus the offset, and then starts
     * the chronometer
     * 
     * @param view The view that was clicked.
     */
    public void resumeActivity(View view) {
        if(!running){
            chronometer.setBase(SystemClock.elapsedRealtime() - offset);
            chronometer.start();
            running = true;
        }
    }

    /**
     * I'm trying to send a GPX file to a server
     * 
     * @param view the view that is being passed in
     */
    public void finishActivity(View view){
        //mileage.setText(miles);
        Intent reciever = getIntent();
        user = reciever.getStringExtra("username");
        date = reciever.getStringExtra("date");
        sport = reciever.getStringExtra("sport");
        String elapsedTime = chronometer.getText().toString();
        Activity activity = new Activity(user,null,date,elapsedTime,miles,generateRouteGPX("gpx test",trkpoints),sport);
        postActivity(activity);
        updateRace();
        track.remove();

        //Document doc = toXMLfromString(generateRouteGPX("gpx test",trkpoints));
        //doc.toString();
        Log.e("This is the route", generateRouteGPX("gpx test",trkpoints));
        //assert doc != null;
        //Log.d("Gpx content", doc.getFirstChild().getNodeName());
        //Log.d("Gpx content", generateRouteGPX("gpx test",trkpoints));
        //Log.e("Gpx content", Arrays.toString(bytes));
        //byte[] bytes = generateRouteGPX("gpx test",trkpoints).trim().getBytes();
        //System.out.println(doc);
        Intent myintent = new Intent(Map.this,Menu.class);
        startActivity(myintent);
    }

    private void updateRace() {
    }

    private void postActivity(Activity act) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
        ActivityAPI activityAPI = retrofit.create(ActivityAPI.class);
        Call<Activity> call = activityAPI.postActivity(act);
        call.enqueue(new Callback<Activity>() {
            @Override
            public void onResponse(Call<Activity> call, Response<Activity> response) {
                Toast.makeText(Map.this, "User Succesfully Added", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailure(Call<Activity> call, Throwable t) {
                Toast.makeText(Map.this, "Post", Toast.LENGTH_LONG).show();

            }
        });
    }

    /**
     * It takes the current track, adds the current location to the list of points, and then sets the
     * points of the track to the new list
     */
    private void updateTrack(){
        List<LatLng> points = track.getPoints();
        points.add(mylocation);
        track.setPoints(points);
    }

    /**
     * It takes a name and a list of locations and returns a string that is a GPX file
     * 
     * @param name The name of the route
     * @param points List of Location objects
     * @return A string of XML.
     */
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
    /**
     * It takes a string and returns a Document object
     * 
     * @param str The string to be converted to XML
     * @return A Document object.
     */
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

    public static OkHttpClient getUnsafeOkHttpClient() {

        try {
            final TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
                @Override
                public void checkClientTrusted(
                        java.security.cert.X509Certificate[] chain,
                        String authType) throws CertificateException {
                }

                @Override
                public void checkServerTrusted(
                        java.security.cert.X509Certificate[] chain,
                        String authType) throws CertificateException {
                }

                @Override
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return new java.security.cert.X509Certificate[0];
                }
            } };

            final SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCerts,
                    new java.security.SecureRandom());
            final SSLSocketFactory sslSocketFactory = sslContext
                    .getSocketFactory();

            OkHttpClient okHttpClient = new OkHttpClient();
            okHttpClient = okHttpClient.newBuilder()
                    .sslSocketFactory(sslSocketFactory)
                    .hostnameVerifier(org.apache.http.conn.ssl.SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER).build();

            return okHttpClient;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}