import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallengeI } from 'src/app/models/challenge.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }
  // challengesMatrix = [[{ id: 1, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 2, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 3, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 4, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 5, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  // [{ id: 6, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 7, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 8, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 9, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 10, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  // [{ id: 11, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 12, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 13, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 14, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 15, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  // [{ id: 16, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 17, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  // { id: 18, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }]];

  challengesMatrix: ChallengeI[][] = [];


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
      btn: 'Join Challenge'
    }

    return dataFormatted
  }

}
