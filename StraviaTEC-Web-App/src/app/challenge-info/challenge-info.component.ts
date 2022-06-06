import { Component, OnInit } from '@angular/core';
import { ChallengeI } from '../models/challenge.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-challenge-info',
  templateUrl: './challenge-info.component.html',
  styleUrls: ['./challenge-info.component.css']
})
export class ChallengeInfoComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }
  challenge!: ChallengeI;
  hasProgress: boolean = false;

  ngOnInit(): void {
    this.challenge = this.data.selectedChallenge;
    this.getGoal(this.challenge.activityId);
    if (this.data.fromChallenges == false) {
      this.getProgress(this.challenge.id);
    }
  }

  /**
   * Get the goal from the API, then wait 100ms before returning the goal.
   * @param {number} id - number - the id of the activity
   */
  async getGoal(id: number) {
    this.api.getActivityById(id).subscribe(data => {
      this.challenge.goal = data.mileage;
    })
    await new Promise(f => (setTimeout(f, 100)));
  }

  /**
   * It gets the progress of a challenge from an API and sets the progress to a variable.
   * 
   * @param {number} id - number = the id of the challenge
   */
  async getProgress(id: number) {
    this.api.getChallengeNumbers(id, this.data.currentUser?.userName).subscribe(data => {
      console.log(data);
      this.challenge.progress = data[0].percentage;
      this.hasProgress = true;

    });
    await new Promise(f => (setTimeout(f, 100)));
  }

}
