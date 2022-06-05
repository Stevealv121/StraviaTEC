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

  constructor(private api:ApiService, private dataService:DataService) {
    this.races=[]
   }

  ngOnInit(): void {
    this.loadRaces()
  }

  loadRaces(){
    this.api.getRacesByManagerId("dennis").subscribe((data:any)=>{ //change dennis for the username
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
