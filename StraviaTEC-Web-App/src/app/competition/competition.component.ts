import { Component, OnInit } from '@angular/core';
import { Race } from '../models/race';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  races:Race[];
  user:string;

  constructor(private api:ApiService, private dataService:DataService) {
    this.races=[]
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
   }

  ngOnInit(): void {
    this.loadRaces()
  }

  loadRaces(){
    this.api.getRacesByManagerId(this.user).subscribe((data:any)=>{ //change dennis for the username
      this.races = data;
      console.log(this.races)
    })
  }
  /**
   * This function saves the selected race's id
   * @param id race id
   */
  saveRaceId(id:number){
    this.dataService.raceId=id;
  }

}
