import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from 'src/app/models/account';
import { Activity } from 'src/app/models/activity';
import { Participants } from 'src/app/models/participants';
import { Race } from 'src/app/models/race';
import { Sponsor } from 'src/app/models/sponsor';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

declare var omnivore: any;
declare var L: any;
const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8


@Component({
  selector: 'app-info-race',
  templateUrl: './info-race.component.html',
  styleUrls: ['./info-race.component.css']
})
export class InfoRaceComponent implements OnInit {

  activity:Activity;
  race:Race;
  Sponsors:Sponsor[];
  accounts:Account[];
  participants:Participants[];
  apiToken = environment.MAPBOXAPIKEY;
  bill:any;
  user:string;


  constructor(private api:ApiService, private dataService:DataService, private sanitizer:DomSanitizer) {
    this.accounts=[];
    this.bill=null;
    this.participants=[];
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
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
    this.loadAccounts();
    this.loadPositonList();


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

  loadPositonList(){
    this.api.getPositionList(this.dataService.raceId).subscribe((data:any) =>{
      this.participants =data;
  })
  }
  /**
   * This function asks to the api for the race's activity information
   */
  loadActivity(){
    this.api.getActivityById(this.race.activityID).subscribe((data:any) =>{
      this.activity =data;

    })
  }
  /**
   * This function asks to the api for the race's sponsors information
   */
  loadSponsors(){
    this.api.getSponsorsByRace(this.dataService.raceId).subscribe((data:any) =>{
      let array:Sponsor[] =data;
      array.forEach(element => {
        let objectURL = 'data:image/jpeg;base64,' + element.logo;
        element.image=this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
      this.Sponsors =data;

  })
  }
  loadBill(bill:string){
    let objectURL = 'data:image/jpeg;base64,' + bill;
    this.bill=this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  loadAccounts(){
    this.api.getBankAccounts(this.dataService.raceId).subscribe((data:any) =>{
      this.accounts =data;
  })
  }
  async deleteMember(userName:string){
    this.api.deleteRaceMember(userName,this.dataService.raceId).subscribe((data:any) =>{
  });
  await new Promise(f => setTimeout(f, 500))
    this.ngOnInit()
  }

}
