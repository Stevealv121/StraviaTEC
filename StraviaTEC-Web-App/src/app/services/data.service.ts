import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  currentUser: UserI | undefined;

}
