import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private data: DataService) { }

  hasRaces: boolean = true;
  hasChallenges: boolean = true;
  races: number[] = [1, 2];
  challenges: number[] = [1, 2, 3];
  leaderboards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  user?: UserI;

  ngOnInit(): void {
    this.user = this.data.currentUser;
  }

}
