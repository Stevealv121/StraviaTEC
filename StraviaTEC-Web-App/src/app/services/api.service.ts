import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { ActivityI } from '../models/activity.interface';
import { AddFriendI } from '../models/addFriend.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";
  activityPath: string = this.url + "Activity";

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

  postActivity(form: ActivityI): Observable<ResponseI> {
    return this.http.post<ResponseI>(this.activityPath, form)
  }

  searchUser(user: string): Observable<UserI[]> {
    let searchPath = this.userPath + "/" + "SearchUsers/" + user;
    return this.http.get<UserI[]>(searchPath)
  }

  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.userPath)
  }

  addFriend(form: AddFriendI): Observable<ResponseI> {
    let addFriendPath = this.userPath + "/" + "AddFriend";
    return this.http.post<ResponseI>(addFriendPath, form)
  }

  getFriendList(username: any): Observable<UserI[]> {
    let friendListPath = this.userPath + "/FriendsList/" + username;
    return this.http.get<UserI[]>(friendListPath)
  }

}
