import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor() { }

  hasRaces: boolean = true;
  hasChallenges: boolean = true;
  races: number[] = [1, 2];
  challenges: number[] = [1, 2, 3];
  leaderboards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
  }

}
