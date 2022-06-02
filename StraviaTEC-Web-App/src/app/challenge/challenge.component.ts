import { Component, OnInit } from '@angular/core';
import { Challenge } from '../models/challenge';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  challenge:Challenge[];

  constructor(private api:ApiService) {
    this.challenge =[];
   }

  ngOnInit(): void {
    //this.loadChallenges();
  }
  /**
   * This function request to the api for the challenges
   */
  loadChallenges(){
    this.api.getChallengeByManagerId("dennis").subscribe((data:any)=>{ //change dennis for the username
      this.challenge = data;
    })
  }

}
