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
  }

  async getGoal(id: number) {
    this.api.getActivityById(id).subscribe(data => {
      this.challenge.goal = data.mileage;
    })
    await new Promise(f => (setTimeout(f, 100)));
  }

  getProgress(id: number) {
    let progress: number = 0;
    //TODO get progress
    return progress;
  }

}
