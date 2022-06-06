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
  /**
   * It takes an id, passes it to the api service, and then subscribes to the observable returned by
   * the api service.
   *
   * The api service is a service that makes http requests to the backend.
   *
   * The api service has a function called deleteRace that takes an id and returns an observable.
   *
   * The observable returned by the api service is subscribed to in the deleteRace function.
   *
   * The deleteRace function is called in the component.
   *
   * The component has a function called deleteRace that takes an id and calls the deleteRace function
   * in the service.
   *
   * The deleteRace function in the component is called in the template.
   *
   * The template has a button that calls the deleteRace function in the component.
   *
   * The button is in a table that displays a list of races.
   *
   * The table is in
   * @param {number} id - number - the id of the race to delete
   */
  async deleteRace(id:number){
    this.api.deleteRace(id).subscribe((data:any)=>{

    })
    await new Promise(f => setTimeout(f,500));
    this.ngOnInit();
  }

}
