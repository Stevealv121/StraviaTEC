import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-race',
  templateUrl: './find-race.component.html',
  styleUrls: ['./find-race.component.css']
})
export class FindRaceComponent implements OnInit {

  constructor(private router: Router) { }
  races: number[] = [1, 2, 3, 4, 5, 6];

  ngOnInit(): void {
  }

  pickRace() {
    this.router.navigateByUrl("race-inscription");
  }

}
