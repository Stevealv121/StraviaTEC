package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.telephony.TelephonyCallback;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.straviatec_mobile.Entities.Activity;
import com.example.straviatec_mobile.Entities.Challenge;
import com.example.straviatec_mobile.Entities.Race;
import com.example.straviatec_mobile.Entities.User;
import com.example.straviatec_mobile.Interfaces.ActivityAPI;
import com.example.straviatec_mobile.Interfaces.ChallengeAPI;
import com.example.straviatec_mobile.Interfaces.RaceAPI;
import com.example.straviatec_mobile.Interfaces.UserAPI;
import com.example.straviatec_mobile.Utilities.Utilities;

import java.io.InputStream;
import java.io.OutputStream;
import java.security.cert.CertificateException;
import java.sql.Blob;
import java.sql.SQLException;
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

public class MainActivity extends AppCompatActivity {
    EditText uname, pass;
    SQLitehelper conn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        conn = new SQLitehelper(getApplicationContext(), "StraviaTEC_DB", null, 1);

        uname = (EditText) findViewById(R.id.uname);
        pass = (EditText) findViewById(R.id.pass);

        if(savedInstanceState == null){
            sincA();
            sincU();
            sincR();
            sincC();
        }
    }

    private void sincR() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
        RaceAPI raceAPI = retrofit.create(RaceAPI.class);
        Call<List<Race>> call = raceAPI.findR();
        call.enqueue(new Callback<List<Race>>() {
            @Override
            public void onResponse(Call<List<Race>> call, Response<List<Race>> response) {
                try{
                    List<Race> racelist = response.body();
                    assert racelist != null;
                    for(Race r: racelist){
                        SQLiteDatabase db = conn.getWritableDatabase();
                        ContentValues values = new ContentValues();
                        values.put(Utilities.FIELD_ID, r.getId());
                        values.put(Utilities.FIELD_NAME, r.getName());
                        values.put(Utilities.FIELD_COST, r.getCost());
                        values.put(Utilities.FIELD_DATE, r.getDate());
                        values.put(Utilities.FIELD_ACCESS, r.getAccess());
                        values.put(Utilities.FIELD_ACTIVITYID, r.getActivityID());
                        values.put(Utilities.FIELD_CATEGORYNAME, r.getCategoryName());

                        db.insert(Utilities.TABLE_RACE,null,values);
                        db.close();
                    }

                }catch(Exception ex){
                    Toast.makeText(MainActivity.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                    Log.e("Error inserting", ex.getMessage());
                }

            }
            @Override
            public void onFailure(Call<List<Race>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error", t.getMessage());
            }
        });
    }

    private void sincC() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
        ChallengeAPI challengeAPI = retrofit.create(ChallengeAPI.class);
        Call<List<Challenge>> call = challengeAPI.findC();
        call.enqueue(new Callback<List<Challenge>>() {
            @Override
            public void onResponse(Call<List<Challenge>> call, Response<List<Challenge>> response) {
                try{
                    List<Challenge> challengeList = response.body();
                    assert challengeList != null;
                    for(Challenge c: challengeList){
                        SQLiteDatabase db = conn.getWritableDatabase();
                        ContentValues values = new ContentValues();
                        values.put(Utilities.FIELD_ID, c.getId());
                        values.put(Utilities.FIELD_VALIDTHRU, c.getValidThru());
                        values.put(Utilities.FIELD_TYPE, c.getType());
                        values.put(Utilities.FIELD_ACCESS, c.getAccess());
                        values.put(Utilities.FIELD_NAME, c.getName());
                        values.put(Utilities.FIELD_ACTIVITYID, c.getActivityId());

                        db.insert(Utilities.TABLE_CHALLENGE, null, values);
                        db.close();

                    }

                }catch(Exception ex){
                    Toast.makeText(MainActivity.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                    Log.e("Error inserting", ex.getMessage());
                }

            }

            @Override
            public void onFailure(Call<List<Challenge>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error", t.getMessage());
            }
        });
    }

    private void sincA() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
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
                    Log.e("Error inserting", ex.getMessage());
                }
            }

            @Override
            public void onFailure(Call<List<Activity>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error", t.getMessage());
            }
        });
    }
    private void sincU() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://10.0.2.2:7060/")
                .addConverterFactory(GsonConverterFactory.create()).client(getUnsafeOkHttpClient()).build();
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
                        values.put(Utilities.FIELD_BDATE, u.getBirthDate());
                        values.put(Utilities.FIELD_NATION, u.getNationality());

                        db.insert(Utilities.TABLE_USER, null,values);
                        db.close();
                    }
                }catch(Exception ex){
                    Toast.makeText(MainActivity.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
                    Log.e("Error inserting", ex.getMessage());
                }
            }
            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                Log.e("Connection error", t.getMessage());
            }
        });

    }

    public void onClick(View view) {
        consult();
    }

    private void consult() {
        String username;
        SQLiteDatabase db = conn.getReadableDatabase();
        String[] consult = {uname.getText().toString(), pass.getText().toString()};
        String[] result = {Utilities.FIELD_USERNAME, Utilities.FIELD_FNAME, Utilities.FIELD_FSNAME};
        try{
            Cursor cursor = db.query(Utilities.TABLE_USER,result,Utilities.FIELD_USERNAME+"=?"+" AND "+Utilities.FIELD_PASS+"=?",consult,null,null,null);
            cursor.moveToFirst();
            Toast.makeText(getApplicationContext(),"Welcome " + cursor.getString(1) + " " + cursor.getString(2), Toast.LENGTH_LONG).show();
            username = cursor.getString(0);
            cursor.close();
            Intent myintent = new Intent(MainActivity.this,Menu.class);
            myintent.putExtra("uname", username);
            startActivity(myintent);

        }catch(Exception ex){
            Toast.makeText(getApplicationContext(),"User was not found", Toast.LENGTH_LONG).show();
            clean();
        }
    }

    private void clean() {
        pass.setText("");
        uname.setText("");
    }

    public static OkHttpClient getUnsafeOkHttpClient() {

        try {
            // Create a trust manager that does not validate certificate chains
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

            // Install the all-trusting trust manager
            final SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCerts,
                    new java.security.SecureRandom());
            // Create an ssl socket factory with our all-trusting manager
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