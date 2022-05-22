package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.Arrays;
import java.util.List;

public class ActivitySetup extends AppCompatActivity {

    private Spinner activities;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setup);
        activities = findViewById(R.id.activities);

        List<String> states = Arrays.asList("Select Sport or Activity","Running","Swimming","Cycling","Trekking","Kayak","Hiking");
        ArrayAdapter adapter = new ArrayAdapter(getApplicationContext(), android.R.layout.simple_spinner_item,states);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        activities.setAdapter(adapter);
    }

    public void onClick(View view) {
        Intent myintent = new Intent(ActivitySetup.this,Map.class);
        startActivity(myintent);
    }
}