import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }

  leaderboards: any[] = [];

  ngOnInit(): void {
    this.setLeaderboards(this.data.selectedRace.id);
  }

  /**
   * This function is called when the user clicks on a button, and it sets the leaderboards variable
   * to the data returned from the API
   * 
   * @param {any} id - the id of the race
   */
  setLeaderboards(id: any) {
    this.api.getLeaderboard(id).subscribe(data => {
      this.leaderboards = data;
    });
  }

}
