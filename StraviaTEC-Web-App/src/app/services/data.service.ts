  raceId:number;
  challengeId:number;
  groupId:string;
import { Injectable } from '@angular/core';
import { RaceI } from '../models/race.interface';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  currentUser: UserI | undefined;
  selectedRace!: RaceI;

}

    this.raceId =0;
    this.challengeId=0;
    this.groupId="";