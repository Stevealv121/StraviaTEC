import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { GroupsGest } from 'src/app/models/groups-gest';
import { Race } from 'src/app/models/race';
import { Sponsor } from 'src/app/models/sponsor';
import { Sport } from 'src/app/models/sport';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.css']
})
export class NewCompetitionComponent implements OnInit {

  sports:string[];
  groups:GroupsGest[];
  sponsors:Sponsor[];
  activities:Activity[];
  categories:string[];

  constructor(private api:ApiService) {
    this.sports=[];
    this.groups=[];
    this.sponsors=[];
    this.activities=[];
    this.categories=[];
   }

  ngOnInit(): void {
    this.loadActities();
    this.loadGroups();
    this.loadSponsors();
    this.loadCategories();
  }
  /**
   * This function request to the api for the activites
   */
  loadActities(){
    this.api.getUserActivities2("dennis").subscribe((data:any)=>{ //change dennis for the username
      this.activities = data;
    })
  }
  /**
   * This function request to the api for the user's groups
   */
  loadGroups(){
    this.api.getGroupInfoByManagerId("dennis").subscribe((data:any)=>{
      this.groups = data;
    })
  }
  /**
   * This function request to the api for the sponsors in the database
   */
  loadSponsors(){
    this.api.getSponsor().subscribe((data:any)=>{
      this.sponsors = data;
    })
  }
  /**
  * This function request to the api for the user's groups
  */
   loadCategories(){
    this.api.getCategory().subscribe((data:any)=>{// cambiar por el username correspondiente
      this.categories = data;
    })
  }
  /**
   * This function creates a new race in the data base
   * @param name race's name
   * @param date race's date
   * @param activity race's activitiy
   * @param cost race's cost
   * @param access race's access
   * @param category race's category
   * @param account1 race's bank account
   * @param account2 race's bank account
   * @param sponsor1 race's sponsor
   * @param sponsor2 race's sponsor
   */
  postRace(name:string, date:string, activity:string, cost:string,access:string,category:string, account1:string, account2:string,sponsor1:string, sponsor2:string ){
    var activityId = activity.split(" ",1);
    var sponsor1Id= sponsor1.split(" ",1);
    var sponsor2Id= sponsor2.split(" ",1);
    var _access = "";
    if(access == "Public"){
      _access="Public";
    }else{
      _access=access.split(":",2)[1];
    }
    var race:Race={
      id:0,
      name:name,
      cost:Number(cost),
      date:date,
      access:_access,
      activityID:Number(activityId[0]),
      categoryName:category
    }
    console.log(race);
    this.api.postRace(race).subscribe((raceId:any)=>{
      this.api.postRaceAccount(String(raceId),account1).subscribe((data:any)=>{

      })
      if (account2 != ""){
        this.api.postRaceAccount(String(raceId),account2).subscribe((data:any)=>{

        })
      }
      this.api.postRaceSponsor(String(raceId), sponsor1Id[0]).subscribe((data:any)=>{

      })
      if (sponsor2 != "None"){
        this.api.postRaceSponsor(String(raceId), sponsor2Id[0]).subscribe((data:any)=>{

        })
      }

    })

  }

}
