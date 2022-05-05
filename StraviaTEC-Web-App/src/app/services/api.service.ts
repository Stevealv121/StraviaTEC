import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:5104/api/";
  userPath: string = this.url + "User";

  login(userName: string, password: string): Observable<UserI> {

    let loginPath = this.userPath + "/" + userName + "/" + password;
    return this.http.get<UserI>(loginPath)
  }
}
