import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { race } from 'rxjs';
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

  async setRaces() {
    /*this.api.getRaces().subscribe(data => {
      this.races = data;

      this.api.getRaceByUser(this.data.currentUser?.userName).subscribe(rsp => {
        console.log(rsp);
        this.races.forEach((element, index) => {
          if (rsp[0].id == element.id) {
            this.races.splice(index, 1);
          }
        });
      });

      console.log(this.races);
    });*/
    
    //TODO: Populate DB
    this.api.getRacesByUserCategory(this.data.currentUser?.userName).subscribe(data => {
      this.races = data;
      this.api.getRaceByUser(this.data.currentUser?.userName).subscribe(rsp => {
        console.log(rsp);
        this.races.forEach((element, index) => {
          if (rsp[0].id == element.id) {
            this.races.splice(index, 1);
          }
        });
      });
    });
    await new Promise(f => (setTimeout(f, 200)));
    console.log(this.races);
  }

}
