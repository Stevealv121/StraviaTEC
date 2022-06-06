package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.straviatec_mobile.Entities.Challenge;
import com.example.straviatec_mobile.Entities.Race;
import com.example.straviatec_mobile.Interfaces.ChallengeAPI;
import com.example.straviatec_mobile.Interfaces.RaceAPI;

import java.security.cert.CertificateException;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ActivitySetup extends AppCompatActivity {

    private Spinner activities, race;
    TextView date;
    String username;
    String ssport;
    String fdate;
    ArrayList<Race> raceList;
    ArrayList<String> showRaces;
    boolean sportSelected = false;
    boolean isChallenge = false;
    boolean isRace = false;
    int uindex;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setup);

        showRaces = new ArrayList<>();
        showRaces.add("Select a Race");

        Intent rintent = getIntent();
        username = rintent.getStringExtra("uname");

        date = findViewById(R.id.date);
        Date currentTime = Calendar.getInstance().getTime();
        SimpleDateFormat format = new SimpleDateFormat("yy-MM-dd");
        fdate = format.format(currentTime);
        date.setText(fdate);
        consultRA(username);

        activities = findViewById(R.id.activities);
        race = findViewById(R.id.race);

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


        ArrayAdapter adapter2 = new ArrayAdapter(getApplicationContext(), android.R.layout.simple_spinner_item,showRaces);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        race.setAdapter(adapter2);
        race.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                if(i!=0){
                    isRace = true;
                    uindex = i;
                    Log.e("Index Value", String.valueOf(uindex));
                }else{
                    isRace = false;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });


    }

    /**
     * It's a function that calls a REST API and returns a list of races
     * 
     * @param user String
     */
    private void consultRA(String user) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
        RaceAPI raceAPI = retrofit.create(RaceAPI.class);
        Call<List<Race>> call = raceAPI.findRU(user);
        call.enqueue(new Callback<List<Race>>() {
            @Override
            public void onResponse(Call<List<Race>> call, Response<List<Race>> response) {
                try{
                    assert response.body() != null;
                    raceList = new ArrayList<>();
                    raceList.addAll(response.body());
                    generateRlist();
                }catch(Exception ex){
                    Toast.makeText(ActivitySetup.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                    Log.e("Error inserting", ex.getMessage());
                }
            }

            @Override
            public void onFailure(Call<List<Race>> call, Throwable t) {
                Toast.makeText(ActivitySetup.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error", t.getMessage());
            }
        });

    }

    /**
     * It takes a list of objects, and creates a new list of strings, where each string is a
     * concatenation of the name and id of the object
     */
    private void generateRlist() {
        Log.e("Racelist", String.valueOf(raceList));
        if (raceList != null){
            for(int i=0; i<raceList.size();i++){
                showRaces.add(raceList.get(i).getName()+"-"+raceList.get(i).getId());
            }
        }
    }

    /**
     * Passes serializable object to another activity
     * 
     * @param view The view that was clicked.
     */
    public void onClick(View view) {
        if(sportSelected){
            if(isRace){
                Race race = raceList.get(uindex-1);
                Bundle bundle = new Bundle();
                bundle.putSerializable("race",race);
                Intent myintent = new Intent(ActivitySetup.this,Map.class);
                myintent.putExtras(bundle);
                myintent.putExtra("date", fdate);
                myintent.putExtra("sport", ssport);
                startActivity(myintent);
            }else{
                Race race = null;
                Bundle bundle = new Bundle();
                bundle.putSerializable("race",race);
                Intent myintent = new Intent(ActivitySetup.this,Map.class);
                myintent.putExtras(bundle);
                myintent.putExtra("username", username);
                myintent.putExtra("date", fdate);
                myintent.putExtra("sport", ssport);
                startActivity(myintent);
            }
        }else{
            Toast.makeText(ActivitySetup.this,"Sport not selected",Toast.LENGTH_SHORT).show();
        }
    }
    /**
     * It creates a new SSLContext with the TrustManager that trusts all certificates, then creates a
     * new SSLSocketFactory with that SSLContext, and finally creates a new OkHttpClient that uses that
     * SSLSocketFactory
     * 
     * @return An OkHttpClient object.
     */
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