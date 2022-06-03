package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class Menu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
    }

    public void toProfile(View view) {
        Intent myintent = new Intent(Menu.this,ProfileVisualizer.class);
        startActivity(myintent);
    }

    public void toActivity(View view) {
        Intent myintent = new Intent(Menu.this,ActivitySetup.class);
        startActivity(myintent);
    }
}