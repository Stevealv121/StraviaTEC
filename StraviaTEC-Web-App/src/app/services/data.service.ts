import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  raceId:number;
  challengeId:number;
  groupId:string;

  constructor() {
    this.raceId =0;
    this.challengeId=0;
    this.groupId="";
   }
}
