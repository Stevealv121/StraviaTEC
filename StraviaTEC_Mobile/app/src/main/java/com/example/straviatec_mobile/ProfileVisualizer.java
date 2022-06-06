package com.example.straviatec_mobile;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.straviatec_mobile.Utilities.Utilities;

import java.sql.Blob;

public class ProfileVisualizer extends AppCompatActivity {

    TextView usname, fullname, bdate, level;
    String user;
    SQLitehelper conn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_visualizer);
        conn = new SQLitehelper(getApplicationContext(), "StraviaTEC_DB", null, 1);
        usname = findViewById(R.id.usname);
        fullname = findViewById(R.id.fullname);
        bdate = findViewById(R.id.bdate);
        level = findViewById(R.id.level);
        fillProfile();

    }

    /**
     * It gets the username from the previous activity, then it queries the database to get the user's
     * information and then it sets the text of the TextViews to the information obtained from the
     * database
     */
    private void fillProfile() {

        try{
            String fname;
            Intent rintent = getIntent();
            user = rintent.getStringExtra("uname");
            Log.e("Using user", user);
            SQLiteDatabase db = conn.getReadableDatabase();
            String[] consult = {user};
            String[] result = {Utilities.FIELD_USERNAME, Utilities.FIELD_FNAME, Utilities.FIELD_SNAME, Utilities.FIELD_FSNAME, Utilities.FIELD_SSNAME, Utilities.FIELD_BDATE, Utilities.FIELD_LEVEL};
            Cursor cursor = db.query(Utilities.TABLE_USER,result,Utilities.FIELD_USERNAME+"=?",consult,null,null,null);
            cursor.moveToFirst();
            fname = cursor.getString(1) +" "+ cursor.getString(2) +" "+ cursor.getString(3) +" "+ cursor.getString(4);
            Log.e("Result", cursor.getString(0)+" "+ cursor.getString(1) +" "+ cursor.getString(2) +" "+ cursor.getString(3) +" "+ cursor.getString(4) +" "+ cursor.getString(5) +" "+ cursor.getString(6));
            usname.setText(cursor.getString(0));
            fullname.setText(fname);
            bdate.setText(cursor.getString(5));
            level.setText(cursor.getString(6));
            cursor.close();

        }catch(Exception ex){
            Toast.makeText(ProfileVisualizer.this,ex.getMessage(),Toast.LENGTH_SHORT).show();
            Log.e("Error Showing", ex.getMessage());
        }

    }

    public void toMenu(View view) {
        Intent myintent = new Intent(ProfileVisualizer.this,Menu.class);
        myintent.putExtra("uname", user);
        startActivity(myintent);
    }
}