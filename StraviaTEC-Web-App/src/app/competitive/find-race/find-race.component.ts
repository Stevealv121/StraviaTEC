import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaceI } from 'src/app/models/race.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-find-race',
  templateUrl: './find-race.component.html',
  styleUrls: ['./find-race.component.css']
})
export class FindRaceComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private data: DataService) { }

  races: RaceI[] = [];

  ngOnInit(): void {
    this.setRaces();
  }

  pickRace(race: any) {
    this.data.selectedRace = race;
    console.log(this.data.selectedRace);
    this.router.navigateByUrl("race-inscription");
  }

  setRaces() {
    this.api.getRaces().subscribe(data => {
      this.races = data;
    })
  }

}
