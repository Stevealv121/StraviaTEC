package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class Menu extends AppCompatActivity {

    String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
    }

    public void onClick(View view) {
        Intent myintent = null;
        Intent rintent = getIntent();
        username = rintent.getStringExtra("uname");
        switch(view.getId()){
            case R.id.toProfile:
                myintent = new Intent(Menu.this,ProfileVisualizer.class);
                myintent.putExtra("uname",username);
                break;
            case R.id.toActivity:
                myintent = new Intent(Menu.this, ActivitySetup.class);
                break;
        }
        Toast.makeText(Menu.this,"Current User: "+username,Toast.LENGTH_LONG).show();
        startActivity(myintent);
    }
}