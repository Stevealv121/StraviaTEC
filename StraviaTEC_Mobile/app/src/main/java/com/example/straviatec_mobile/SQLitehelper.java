package com.example.straviatec_mobile;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import androidx.annotation.Nullable;

import com.example.straviatec_mobile.Utilities.Utilities;

public class SQLitehelper extends SQLiteOpenHelper {

    public SQLitehelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        db.execSQL(Utilities.CREATE_ACTIVITY_TABLE);
        db.execSQL(Utilities.CREATE_ADDS_TABLE);
        db.execSQL(Utilities.CREATE_BANKACCOUNT_TABLE);
        db.execSQL(Utilities.CREATE_BELONGSTO_TABLE);
        db.execSQL(Utilities.CREATE_CATEGORY_TABLE);
        db.execSQL(Utilities.CREATE_CHALLENGE_TABLE);
        db.execSQL(Utilities.CREATE_GROUP_TABLE);
        db.execSQL(Utilities.CREATE_JOINCHALLENGE_TABLE);
        db.execSQL(Utilities.CREATE_JOINRACE_TABLE);
        db.execSQL(Utilities.CREATE_MANAGES_TABLE);
        db.execSQL(Utilities.CREATE_RACE_TABLE);
        db.execSQL(Utilities.CREATE_REGISTER_TABLE);
        db.execSQL(Utilities.CREATE_SPONSOR_TABLE);
        db.execSQL(Utilities.CREATE_SPONSORRACE_TABLE);
        db.execSQL(Utilities.CREATE_SPORT_TABLE);
        db.execSQL(Utilities.CREATE_USER_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int i, int i1) {
        db.execSQL("DROP TABLE IF EXISTS activity");
        db.execSQL("DROP TABLE IF EXISTS adds");
        db.execSQL("DROP TABLE IF EXISTS bank_account");
        db.execSQL("DROP TABLE IF EXISTS belongs_to");
        db.execSQL("DROP TABLE IF EXISTS category");
        db.execSQL("DROP TABLE IF EXISTS challenge");
        db.execSQL("DROP TABLE IF EXISTS [group]");
        db.execSQL("DROP TABLE IF EXISTS join_challenge");
        db.execSQL("DROP TABLE IF EXISTS join_race");
        db.execSQL("DROP TABLE IF EXISTS manages");
        db.execSQL("DROP TABLE IF EXISTS race");
        db.execSQL("DROP TABLE IF EXISTS register");
        db.execSQL("DROP TABLE IF EXISTS sponsor");
        db.execSQL("DROP TABLE IF EXISTS sponsors_race");
        db.execSQL("DROP TABLE IF EXISTS sport");
        db.execSQL("DROP TABLE IF EXISTS user");
        onCreate(db);

    }
}
