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


  constructor(private api:ApiService, private dataService:DataService, private sanitizer:DomSanitizer) {
    this.accounts=[];
    this.participants=[];
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
  setRoute(data: any) {
    //let objectURL = 'data:application/octet-stream;base64,' + data;
    let objectURL = 'data:application/gpx+xml;base64,' + data;
    return objectURL
  }

  displayMap(mapId: string, route: any) {
    console.log("This is the map: " + mapId);
    let routeGPX = this.setRoute(route);
    console.log(routeGPX);
    setTimeout(() => {
      const container = document.getElementById(mapId);
      if (container) {
        var myStyle = {
          "color": "#3949AB",
          "weight": 5,
          "opacity": 0.95
        };

        var map = L.map(mapId).setView(defaultCoords, defaultZoom);

        map.maxZoom = 100;

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: this.apiToken
        }).addTo(map);

        var customLayer = L.geoJson(null, {
          style: myStyle
        });

        //this.gpxData
        var gpxLayer = omnivore.gpx(routeGPX, null, customLayer)
          .on('ready', function () {
            map.fitBounds(gpxLayer.getBounds());
          }).addTo(map);

      }
    }, 100);
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
