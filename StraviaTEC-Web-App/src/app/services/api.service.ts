import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { GroupsGest } from '../models/groups-gest';
import { Race } from '../models/race';
import { Challenge } from '../models/challenge';
import { ActivityI } from '../models/activity.interface';
import { AddFriendI } from '../models/addFriend.interface';
import { RaceI } from '../models/race.interface';
import { JoinRaceI } from '../models/joinRace.interface';
import { ChallengeI } from '../models/challenge.interface';
import { GroupI } from '../models/group.interface';
import { url } from 'inspector';
import { CommentI } from '../models/comment.interface';
import { Sponsor } from '../models/sponsor';
import { Activity } from '../models/activity';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";
  getgroupInfoPath: string = this.url + "Group/ByManager/";
  getRaceManagerId: string = this.url + "Race/ByUserName/";
  getRaceByIdPath: string = this.url + "Race/ById/";
  getChallengeManagerId: string = this.url + "Challenge/ByUserName/";
  getSportsPath: string = this.url + "Sport";
  activityPath: string = this.url + "Activity";
  getSponsorPath: string = this.url + "Sponsor";
  getCategoryPath: string = this.url + "Category";
  getActitityByIdPath: string = this.url + "Activity/ById/";
  getSponsorByRace: string = this.url + "Race/Sponsors/ById/";
  groupPath: string = this.url + "Group";
  getActitvityUserPath: string = this.url + "Activity/ByUserName/";
  racespath: string = this.url + "Race";
  postSponsorpath: string = this.racespath + "/AssignRaceSponsor/";
  postBankAccountPath: string = this.racespath + "/BankAccount/";
  postChallengePath: string = this.url + "Challenge";
  racePath: string = this.url + "Race";
  challengePath: string = this.url + "Challenge";
  commentPath: string = this.url + "Comments";



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

  postActivity(form: ActivityI) {
    return this.http.post<any>(this.activityPath, form)
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

  getUserNumbers(username: any) {
    let path = this.userPath + "/UserNumbers/" + username;
    return this.http.get<any>(path)
  }

  joinChallenge(username: any, challengeId: any, activityID: any): Observable<ResponseI> {
    let joinPath = this.challengePath + "/JoinChallenge/" + username + "/" + challengeId + "/" + activityID;
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
    let challengePath = this.challengePath + "/UserJoins/" + username;
    return this.http.get<ChallengeI[]>(challengePath)
  }

  getChallengeNumbers(challengeId: any, username: any) {
    let path = this.challengePath + "/ChallengeNumbers/" + challengeId + "/" + username;
    return this.http.get<any>(path)
  }

  finishChallenge(activityID: any, challengeId: any, username: any) {
    let path = this.challengePath + "/JoinChallenge/InputActivity/" + activityID + "/" + challengeId + "/" + username;
    return this.http.put<any>(path, null)
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

  getActivityComments(id: number): Observable<CommentI[]> {
    let path = this.commentPath + "/Activity/" + id.toString();
    return this.http.get<CommentI[]>(path)
  }

  postComment(form: CommentI): Observable<ResponseI> {
    return this.http.post<ResponseI>(this.commentPath, form)
  }

  //POST
  /**
   * This function creates a new group in the database
   * @param form form with the group's information
   * @returns database's reponse
   */
  postGroup(form: GroupsGest) {
    return this.http.post<GroupsGest>(this.groupPath, form);
  }
  /**
   * This function creates a new race in the database
   * @param form form with the race's information
   * @returns database's reponse
   */
  postRace(form: Race) {
    return this.http.post<Race>(this.racespath, form);
  }
  /**
   * This function assings a sponsor to a race in the database
   * @param raceId race id
   * @param sponsorId sponsor id
   * @returns database's response
   */
  postRaceSponsor(raceId: string, sponsorId: string) {
    return this.http.post<any>(this.postSponsorpath + raceId + "/" + sponsorId, null);
  }
  /**
   * This function assings a bank account to a race in the database
   * @param raceId race id
   * @param BankAccount account number
   * @returns database's response
   */
  postRaceAccount(raceId: string, BankAccount: string) {
    return this.http.post<string>(this.postBankAccountPath + raceId + "/" + BankAccount, null);
  }
  /**
   * This function creates a new challenge un the database
   * @param form challenge type object
   * @returns api response
   */
  postChallenge(form: Challenge) {
    return this.http.post<Challenge>(this.postChallengePath, form);
  }


  //GETS

  /**
   * This function asks the api for the groups created by username
   * @param username owner's username
   * @returns groups who belongs to the specified user
   */
  getGroupInfoByManagerId(username: string) {
    return this.http.get<string[]>(this.getgroupInfoPath + username); //some problems maybe the http or https
  }
  /**
   * This function asks the api for the activities created by username
   * @param username owner's username
   * @returns activities who belongs to the specified user
   */
  getUserActivities2(user: string) {
    return this.http.get<string[]>(this.getActitvityUserPath + user);
  }
  /**
   * This function asks the api for the races created by the user.
   * @param username owner's username
   * @returns races created by the specified user
   */
  getRacesByManagerId(username: string) {
    return this.http.get<string[]>(this.getRaceManagerId + username);
  }
  /**
   * This function asks the api for the challenges created by the user.
   * @param username owner's username
   * @returns Challenges created by the specified user
   */
  getChallengeByManagerId(username: string) {
    return this.http.get<string[]>(this.getChallengeManagerId + username);
  }
  /**
   * This function asks the api for the sports in the data base
   * @returns sports in the data base
   */
  getSports() {
    return this.http.get<string[]>(this.getSportsPath);
  }
  /**
   This function asks the api for the sponsors in the data base
   * @returns sponsors in the data base
   */
  getSponsor() {
    return this.http.get<string[]>(this.getSponsorPath);
  }
  /**
   This function asks the api for the categories in the data base
   * @returns categories in the data base
   */
  getCategory() {
    return this.http.get<string[]>(this.getCategoryPath);
  }
  /**
   * This function asks the api for a race in the data base
   * @param id race Id
   * @returns race's information
   */
  getRaceById(id: number) {
    return this.http.get<Race>(this.getRaceByIdPath + id);
  }
  getActivityById(id: number) {
    return this.http.get<Activity>(this.getActitityByIdPath + id);
  }
  /**
   * This function asks the api for a race's sponsors in the data base
   * @param id race Id
   * @returns sponsor's information
   */
  getSponsorsByRace(id: number) {
    return this.http.get<Sponsor[]>(this.getSponsorByRace + id);
  }
  //DELETES

  //PUTS
  /**
   * This function updates a challenge in the data base
   * @param form challenge's information
   * @returns database reponse
   */
  putChallenge(form: Challenge) {
    return this.http.put<Challenge>(this.postChallengePath, form);
  }
  /**
   * This function updates a race in the data base
   * @param form race's information
   * @returns database reponse
   */
  putRace(form: Race) {
    return this.http.put<Race>(this.racespath, form);
  }
  /**
   * This function updates a group in the data base
   * @param form group's information
   * @returns database reponse
   */
  putGroup(form: GroupsGest) {
    return this.http.put<GroupsGest>(this.groupPath, form);
  }



}
