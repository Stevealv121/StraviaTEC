import { Component, OnInit } from '@angular/core';
import { GroupsGest } from 'src/app/models/groups-gest';
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

  constructor(private api:ApiService) {
    this.sports=[];
    this.groups=[];
    this.sponsors=[];
   }

  ngOnInit(): void {
    this.loadSports();
    this.loadGroups();
    this.loadSponsors();
  }
  /**
   * This function request to the api for the sports
   */
  loadSports(){
    this.api.getSports().subscribe((data:any)=>{ //change dennis for the username
      this.sports = data;
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

}
