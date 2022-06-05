import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Race } from 'src/app/models/race';
import { Sponsor } from 'src/app/models/sponsor';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-info-race',
  templateUrl: './info-race.component.html',
  styleUrls: ['./info-race.component.css']
})
export class InfoRaceComponent implements OnInit {

  activity:Activity;
  race:Race;
  Sponsors:Sponsor[];

  constructor(private api:ApiService, private dataService:DataService) {
    this.activity ={
      username:"",
      id: 0,
      date:"",
      duration:"",
      mileage: 0,
      route:0,
      sportName:""
    }
    this.Sponsors = [];
    this.race = {
      id: 0,
      name:"",
      cost:0,
      date:"",
      access:"",
      activityID:0,
      categoryName:""
    };
   }

  ngOnInit(): void {
    this.loadRace();
    this.loadSponsors();
  }
  /**
   * This function asks to the api for the race's information
   */
  loadRace(){
    console.log(this.dataService.raceId);
    this.api.getRaceById(this.dataService.raceId).subscribe((data:any) =>{
        this.race =data;
        this.loadActivity();
    })

  }
  /**
   * This function asks to the api for the race's activity information
   */
  loadActivity(){
    console.log(this.race);
    this.api.getActivityById(this.race.activityID).subscribe((data:any) =>{
      this.activity =data;
  })
  }
  /**
   * This function asks to the api for the race's sponsors information
   */
  loadSponsors(){
    this.api.getSponsorsByRace(this.dataService.raceId).subscribe((data:any) =>{
      this.Sponsors =data;
      console.log(this.Sponsors)
  })
  }

}
