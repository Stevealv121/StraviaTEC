import { Component, OnInit } from '@angular/core';
import { Challenge } from '../models/challenge';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  challenge:Challenge[];

  constructor(private api:ApiService, private dataService:DataService) {
    this.challenge =[];
   }

  ngOnInit(): void {
    this.loadChallenges();
  }
  /**
   * This function request to the api for the challenges
   */
  loadChallenges(){
    this.api.getChallengeByManagerId("dennis").subscribe((data:any)=>{ //change dennis for the username
      this.challenge = data;
    })
  }
  /**
   * This function saves the id of a challenge
   * @param id challenge's id
   */
  saveChallengeId(id:number){
    this.dataService.challengeId=id;
    console.log(this.dataService.challengeId)
  }
  async deleteChallenge(id:number){
    this.api.deleteChallenge(id).subscribe((data:any)=>{

    })
    await new Promise(f => setTimeout(f, 500))
    this.ngOnInit()
  }

}
