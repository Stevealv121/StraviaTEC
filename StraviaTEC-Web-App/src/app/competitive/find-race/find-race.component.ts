import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaceI } from 'src/app/models/race.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-find-race',
  templateUrl: './find-race.component.html',
  styleUrls: ['./find-race.component.css']
})
export class FindRaceComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }
  //races: number[] = [1, 2, 3, 4, 5, 6];
  races: RaceI[] = [];

  ngOnInit(): void {
    this.setRaces();
  }

  pickRace() {
    this.router.navigateByUrl("race-inscription");
  }

  setRaces() {
    this.api.getRaces().subscribe(data => {
      this.races = data;
    })
  }

}
