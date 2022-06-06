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
    console.log(this.challengesMatrix);
    this.checkIfUserHasChallenges();
    console.log(this.challengesMatrix);
  }

  /**
   * The function is called when a user clicks on a button. The button has an id that is passed to the
   * function. The function then loops through a matrix of challenges and checks if the button id
   * matches the challenge id. If it does, it checks if the button text is 'Join Challenge'. If it is,
   * it calls an API to join the challenge. If the button text is 'Challenged Joined', it calls an API
   * to exit the challenge.
   * 
   * @param {number} btnID - number - the id of the button that was clicked
   */
  joinChallenge(btnID: number) {
    this.challengesMatrix.forEach(element => {
      element.forEach(challenge => {
        if (btnID == challenge.id && challenge.btn == 'Join Challenge') {
          this.api.joinChallenge(this.data.currentUser?.userName, challenge.id, challenge.activityId).subscribe(data => {
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

  /**
   * It takes an array of objects, and pushes 5 objects(Challenges) at a time into a new array, which is then
   * pushed into a new array. Then it sets the Matrix. 
   */
  async setMatrix() {
    //5 elements
    this.api.getChallenges().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let n = i % 5;
        if (n == 0) {
          let array: ChallengeI[] = [];
          for (let is = 0; is < 5; is++) {
            if (data[i + is]) {
              //console.log(data[i + is]);
              array.push(this.setButtonsValues(data[i + is], '#00AF3D', 'white', 'Join Challenge'));
            }
          }
          this.challengesMatrix.push(array);
        }
      }
    }
    )
    await new Promise(f => (setTimeout(f, 100)));
  }

  /**
   * This function takes in a data object, and returns a new object with the same properties as the
   * original, but with the addition of three new properties. New properties: data, color, font, btn
   * 
   * The function is called like this:
   * 
   * let dataFormatted = setButtonsValues(data, color, font, btn)
   * 
   * The data object is passed in as the first argument, and the other three arguments are passed in as
   * the second, third, and fourth arguments.
   * 
   * The function returns a new object with the same properties as the original, but with the addition
   * of three new properties.
   * 
   * The new object is assigned to the variable dataFormatted.
   * @param {ChallengeI} data - ChallengeI = {
   * @param {any} color - string = '#ffffff'
   * @param {any} font - string = 'white'
   * @param {any} btn - string = 'btn-primary'
   * @returns The dataFormatted object.
   */
  setButtonsValues(data: ChallengeI, color: any, font: any, btn: any) {

    let dataFormatted: ChallengeI = {
      id: data.id,
      validThru: data.validThru,
      type: data.type,
      access: data.access,
      name: data.name,
      activityId: data.activityId,
      //Buttons
      color: color,
      font: font,
      btn: btn,
      //More
      progress: null,
      goal: null
    }

    return dataFormatted
  }

  /**
   * When the user clicks on a challenge, the challenge is passed to the challenge-info page, and the
   * user is navigated to the challenge-info page.
   * @param {any} selectedChallenge - any
   */
  moreInfo(selectedChallenge: any) {
    this.data.selectedChallenge = selectedChallenge;
    this.data.fromChallenges = true;
    this.router.navigateByUrl("/challenge-info");
  }

  /**
   * It checks if the user has joined a challenge, if so, it changes the color of the
   * button to green.
   * 
   */
  async checkIfUserHasChallenges() {
    this.api.getChallengeByUser(this.data.currentUser?.userName).subscribe(rsp => {
      console.log(rsp);
      this.challengesMatrix.forEach(element => {
        element.forEach(challenge => {
          if (rsp[0].id == challenge.id) {
            challenge.color = 'white';
            challenge.font = '#00AF3D';
            challenge.btn = 'Challenged Joined';
          }
        });
      });
    });
    await new Promise(f => (setTimeout(f, 500)));
  }


}
