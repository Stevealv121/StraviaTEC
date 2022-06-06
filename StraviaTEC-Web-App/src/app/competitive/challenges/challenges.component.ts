import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallengeI } from 'src/app/models/challenge.interface';
import { GoalI } from 'src/app/models/goals.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService, private router: Router) { }

  challengesMatrix: ChallengeI[][] = [];
  goals: GoalI[] = [];


  ngOnInit(): void {
    this.setMatrix();
  }

  joinChallenge(btnID: number) {
    this.challengesMatrix.forEach(element => {
      element.forEach(challenge => {
        if (btnID == challenge.id && challenge.btn == 'Join Challenge') {
          this.api.joinChallenge(this.data.currentUser?.userName, challenge.id).subscribe(data => {
            console.log(data);
            challenge.color = 'white';
            challenge.font = '#00AF3D';
            challenge.btn = 'Challenged Joined';

          })
        } else if (btnID == challenge.id && challenge.btn == 'Challenged Joined') {
          this.api.exitChallenge(this.data.currentUser?.userName, challenge.id).subscribe(data => {
            console.log(data);
            challenge.color = '#00AF3D';
            challenge.font = 'white';
            challenge.btn = 'Join Challenge';
          })

        }
      })
    });
  }

  setMatrix() {
    //5 elements
    this.api.getChallenges().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let n = i % 5;
        if (n == 0) {
          let array: ChallengeI[] = [];
          for (let is = 0; is < 5; is++) {
            if (data[i + is]) {
              array.push(this.setButtonsValues(data[i + is]));
            }
          }
          this.challengesMatrix.push(array);
        }
      }
    }
    )
  }

  setButtonsValues(data: ChallengeI) {

    let dataFormatted: ChallengeI = {
      id: data.id,
      validThru: data.validThru,
      type: data.type,
      access: data.access,
      name: data.name,
      activityId: data.activityId,
      //Buttons
      color: '#00AF3D',
      font: 'white',
      btn: 'Join Challenge',
      //More
      progress: null,
      goal: null
    }

    return dataFormatted
  }

  moreInfo(selectedChallenge: any) {
    this.data.selectedChallenge = selectedChallenge;
    this.router.navigateByUrl("/challenge-info");
  }


}
