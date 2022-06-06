import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private data: DataService, private api: ApiService, private router: Router) { }

  hasRaces: boolean = false;
  hasChallenges: boolean = false;
  // races: number[] = [1, 2];
  // challenges: number[] = [1, 2, 3];
  races: RaceI[] = [];
  challenges: ChallengeI[] = [];
  //leaderboards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //leaderboards: any[][] = [];
  user?: UserI;

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.setRaces();
    this.setChallenges();
    //this.setLeaderboards();
  }

  /**
   * It gets the races from the database and assigns them to the races variable.
   */
  setRaces() {
    this.api.getRaceByUser(this.user?.userName).subscribe(data => {
      if (data.length != 0) {
        this.races = data;
        this.hasRaces = true;
      }
    });
  }

  /**
   * This function gets the challenges from the database and sets them to the challenges variable.
   */
  setChallenges() {
    this.api.getChallengeByUser(this.user?.userName).subscribe(data => {
      if (data.length != 0) {
        this.challenges = data;
        this.hasChallenges = true
      }
    });
  }

  /**
   * When the user clicks on a challenge, the challenge is passed to the challenge-info component and
   * the user is navigated to the challenge-info page.
   * @param {any} selectedChallenge - any
   */
  moreInfo(selectedChallenge: any) {
    this.data.selectedChallenge = selectedChallenge;
    this.router.navigateByUrl("/challenge-info");
  }

  /**
   * This function takes in a selectedRace object and sets it to the selectedRace property of the data
   * service, then navigates to the leaderboard page.
   * @param {any} selectedRace - any
   */
  goToLeaderboard(selectedRace: any) {
    this.data.selectedRace = selectedRace;
    this.router.navigateByUrl("/leaderboard");
  }

}
