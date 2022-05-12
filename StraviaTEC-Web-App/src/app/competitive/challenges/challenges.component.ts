import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  constructor() { }
  challengesMatrix = [[{ id: 1, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 2, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 3, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 4, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 5, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  [{ id: 6, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 7, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 8, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 9, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 10, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  [{ id: 11, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 12, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 13, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 14, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 15, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }],
  [{ id: 16, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 17, color: '#00AF3D', font: 'white', btn: 'Join Challenge' },
  { id: 18, color: '#00AF3D', font: 'white', btn: 'Join Challenge' }]];


  ngOnInit(): void {
  }

  joinChallenge(id: number) {
    this.challengesMatrix.forEach(element => {
      element.forEach(challenge => {
        if (id == challenge.id) {
          challenge.color = 'white';
          challenge.font = '#00AF3D';
          challenge.btn = 'Challenged Joined';
        }
      })
    });
  }

}
