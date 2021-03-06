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

    /**
     * It takes the username from the previous activity and passes it to the next activity.
     * </code>
     * 
     * @param view the view that was clicked
     */
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
                myintent.putExtra("uname",username);
                break;
        }
        Toast.makeText(Menu.this,"Current User: "+username,Toast.LENGTH_LONG).show();
        startActivity(myintent);
    }
}