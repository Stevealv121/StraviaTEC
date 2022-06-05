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
