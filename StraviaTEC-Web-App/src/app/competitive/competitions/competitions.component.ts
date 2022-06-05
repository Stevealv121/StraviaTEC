import { Component, OnInit } from '@angular/core';
import { ChallengeI } from 'src/app/models/challenge.interface';
import { RaceI } from 'src/app/models/race.interface';
import { UserI } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private data: DataService, private api: ApiService) { }

  hasRaces: boolean = false;
  hasChallenges: boolean = false;
  // races: number[] = [1, 2];
  // challenges: number[] = [1, 2, 3];
  races: RaceI[] = [];
  challenges: ChallengeI[] = [];
  leaderboards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  user?: UserI;
  progress: any;

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.setRaces();
    this.setChallenges();
  }

  setRaces() {
    this.api.getRaceByUser(this.user?.userName).subscribe(data => {
      if (data.length != 0) {
        this.races = data;
        this.hasRaces = true;
      }
    })
  }

  setChallenges() {
    this.api.getChallengeByUser(this.user?.userName).subscribe(data => {
      if (data.length != 0) {
        this.challenges = data;
        this.hasChallenges = true
      }
    })
  }

}
