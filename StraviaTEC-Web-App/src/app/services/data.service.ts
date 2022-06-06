
import { Injectable } from '@angular/core';
import { ChallengeI } from '../models/challenge.interface';
import { RaceI } from '../models/race.interface';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  raceId: number;
  challengeId: number;
  groupId: string;
  constructor() {
    this.raceId = 0;
    this.challengeId = 0;
    this.groupId = "";
  }
  currentUser: UserI | undefined;
  selectedRace!: RaceI;
  selectedChallenge!: ChallengeI;

}

