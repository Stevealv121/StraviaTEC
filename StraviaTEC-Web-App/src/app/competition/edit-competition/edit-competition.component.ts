import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { GroupsGest } from 'src/app/models/groups-gest';
import { Race } from 'src/app/models/race';
import { Sponsor } from 'src/app/models/sponsor';
import { Sport } from 'src/app/models/sport';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.css']
})
export class EditCompetitionComponent implements OnInit {
  sports:string[];
  groups:GroupsGest[];
  sponsors:Sponsor[];
  activities:Activity[];
  categories:string[];
  raceId:number;
  constructor(private api:ApiService, private dataService:DataService) {
    this.sports=[];
    this.groups=[];
    this.sponsors=[];
    this.activities=[];
    this.categories=[];
    this.raceId =dataService.raceId;
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
    this.api.getUserActivities("dennis").subscribe((data:any)=>{ //change dennis for the username
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
  updateRace(name:string, date:string, activity:string, cost:string,access:string,category:string){
    var activityId = activity.split(" ",1);
    var race:Race={
      id:this.raceId,
      name:name,
      cost:Number(cost),
      date:date,
      access:access.split(":",2)[1],
      activityID:Number(activityId[0]),
      categoryName:category
    }
    console.log(race);
    this.api.putRace(race).subscribe((raceId:any)=>{

    })

  }

}
