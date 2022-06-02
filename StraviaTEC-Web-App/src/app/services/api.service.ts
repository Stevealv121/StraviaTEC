import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { ActivityI } from '../models/activity.interface';
import { AddFriendI } from '../models/addFriend.interface';
import { RaceI } from '../models/race.interface';
import { JoinRaceI } from '../models/joinRace.interface';
import { ChallengeI } from '../models/challenge.interface';
import { GroupI } from '../models/group.interface';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";
  activityPath: string = this.url + "Activity";
  racePath: string = this.url + "Race";
  challengePath: string = this.url + "Challenge";
  groupPath: string = this.url + "Group"

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

  deleteFriend(form: AddFriendI): Observable<ResponseI> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: form
    };
    let deleteFriendPath = this.userPath + "/DeleteFriend";
    return this.http.delete<ResponseI>(deleteFriendPath, options)
  }

  getRaces(): Observable<RaceI[]> {
    return this.http.get<RaceI[]>(this.racePath)
  }

  getRacesByUserCategory(username: any): Observable<RaceI[]> {
    let categoryPath = this.racePath + "/ByUserCategory/" + username;
    return this.http.get<RaceI[]>(categoryPath)
  }

  joinRace(form: JoinRaceI): Observable<ResponseI> {
    let joinPath = this.racePath + "/JoinRace";
    return this.http.post<ResponseI>(joinPath, form)
  }

  getChallenges(): Observable<ChallengeI[]> {
    return this.http.get<ChallengeI[]>(this.challengePath)
  }

  joinChallenge(username: any, challengeId: any): Observable<ResponseI> {
    let joinPath = this.challengePath + "/JoinChallenge/" + username + "/" + challengeId;
    return this.http.post<ResponseI>(joinPath, null)
  }

  exitChallenge(username: any, challengeId: any): Observable<ResponseI> {
    let exitPath = this.challengePath + "/ExitChallenge/" + username + "/" + challengeId;
    return this.http.post<ResponseI>(exitPath, null)
  }

  getRaceByUser(username: any): Observable<RaceI[]> {
    let racesPath = this.racePath + "/ByUserName/" + username;
    return this.http.get<RaceI[]>(racesPath)
  }

  getChallengeByUser(username: any): Observable<ChallengeI[]> {
    let challengePath = this.challengePath + "/ByUserName/" + username;
    return this.http.get<ChallengeI[]>(challengePath)
  }

  getGroups(): Observable<GroupI[]> {
    return this.http.get<GroupI[]>(this.groupPath)
  }

  joinGroup(username: any, group: any): Observable<ResponseI> {
    let joinPath = this.groupPath + "/JoinGroup/" + username + "/" + group;
    return this.http.post<ResponseI>(joinPath, null)
  }

  exitGroup(username: any, group: any): Observable<ResponseI> {
    let exitPath = this.groupPath + "/GroupMember/" + group + "/" + username;
    return this.http.post<ResponseI>(exitPath, null)
  }

  getFriendsActivities(username: any): Observable<ActivityI[]> {
    let activitesPath = this.userPath + "/FriendsActivities/" + username;
    return this.http.get<ActivityI[]>(activitesPath)
  }

  getUserActivities(username: any): Observable<ActivityI[]> {
    let activitesPath = this.activityPath + "/ByUserName/" + username;
    return this.http.get<ActivityI[]>(activitesPath)
  }

}
