package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.straviatec_mobile.Utilities.Utilities;

public class ProfileVisualizer extends AppCompatActivity {

    TextView user, fullname, bdate, level;
    String username;
    SQLitehelper conn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        user = (TextView) findViewById(R.id.username);
        fullname = (TextView) findViewById(R.id.fullname);
        bdate = (TextView) findViewById(R.id.bdate);
        level = (TextView) findViewById(R.id.level);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_visualizer);
        conn = new SQLitehelper(getApplicationContext(), "TecAir_BD", null, 1);
        fillProfile();
    }

    private void fillProfile() {
        Intent rintent = getIntent();
        username = rintent.getStringExtra("uname");
        SQLiteDatabase db = conn.getReadableDatabase();
        String[] consult = {username};
        String[] result = {Utilities.FIELD_USERNAME, Utilities.FIELD_FNAME, Utilities.FIELD_FSNAME, Utilities.FIELD_FSNAME, Utilities.FIELD_SSNAME, Utilities.FIELD_BDATE, Utilities.FIELD_LEVEL};
        Cursor cursor = db.query(Utilities.TABLE_USER,result,Utilities.FIELD_USERNAME+"=?",consult,null,null,null);
        cursor.moveToFirst();
        user.setText(cursor.getString(0));
        fullname.setText(cursor.getString(1) +" "+ cursor.getString(2) +" "+ cursor.getString(3) +" "+ cursor.getString(4));
        bdate.setText(cursor.getString(5));
        level.setText(cursor.getString(6));
        cursor.close();
    }

    public void toMenu(View view) {
        Intent myintent = new Intent(ProfileVisualizer.this,Menu.class);
        startActivity(myintent);
    }
}