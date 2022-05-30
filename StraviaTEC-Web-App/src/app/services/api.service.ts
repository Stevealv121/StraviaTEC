import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";

  login(userName: string, password: string): Observable<UserI> {
    let loginPath = this.userPath + "/" + "Login/" + userName + "/" + password;
    return this.http.get<UserI>(loginPath)
  }

  signUp(form: UserI): Observable<ResponseI> {
    return this.http.post<ResponseI>(this.userPath, form)
  }

  changeCredentials(form: UserI): Observable<ResponseI> {
    return this.http.put<ResponseI>(this.userPath, form);
  }

  deleteAccount(userName: string | null, password: string | null): Observable<ResponseI> {
    let deletePath = this.userPath + "/" + "Account/" + userName + "/" + password;
    return this.http.delete<ResponseI>(deletePath)
  }

}
