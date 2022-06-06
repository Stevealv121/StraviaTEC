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

  /**
   *"When the user clicks on a race, the race is stored in the data service and the user is redirected
   * to the race-inscription page.
   * @param {any} race - any
   */
  pickRace(race: any) {
    this.data.selectedRace = race;
    console.log(this.data.selectedRace);
    this.router.navigateByUrl("race-inscription");
  }

  /**
   * It gets all the races from the database, then get the races that the user is already in,
   * and then remove the races that the user is already in from the list of races.
   * 
   */
  async setRaces() {
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
