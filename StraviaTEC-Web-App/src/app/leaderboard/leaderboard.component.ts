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

  setLeaderboards(id: any) {
    this.api.getLeaderboard(id).subscribe(data => {
      this.leaderboards = data;
    });
  }

}
