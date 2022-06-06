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
import { Member } from '../models/member';
import { Account } from '../models/account';
import { Participants } from '../models/participants';


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
  groupMembersPath: string = this.url + "Group/MembersByGroupName/";
  deleteGMemberPath: string = this.url + "Group/GroupMember/";
  deleteGroupPath: string = this.url + "Group/ByName/";
  challengeById: string = this.url + "Challenge/ById/";
  AccountByIDPath: string = this.url + "Race/BankAccount/ById/";
  positionListPath: string = this.url + "Race/PositionList/";
  exitRacePath: string = this.url + "Race/ExitRace/";
  deleteRacePath: string = this.url + "Race/ById/";



  /**
   * This function takes a username and password, and returns an observable of type UserI.
   * @param {string} userName - string, password: string
   * @param {string} password - string
   * @returns Observable&lt;UserI&gt;
   */
  login(userName: string, password: string): Observable<UserI> {
    let loginPath = this.userPath + "/" + "Login/" + userName + "/" + password;
    return this.http.get<UserI>(loginPath)
  }

  /**
   * This function takes a UserI object and returns an Observable of type ResponseI.
   * @param {UserI} form - UserI
   * @returns The response from the server.
   */
  signUp(form: UserI): Observable<ResponseI> {
    return this.http.post<ResponseI>(this.userPath, form)
  }

  /**
   * It takes a UserI object, sends it to the server, and returns a ResponseI object
   * @param {UserI} form - UserI
   * @returns The response from the server.
   */
  changeCredentials(form: UserI): Observable<ResponseI> {
    return this.http.put<ResponseI>(this.userPath, form);
  }

  /**
   * This function deletes a user account from the database.
   * @param {string | null} userName - string | null, password: string | null
   * @param {string | null} password - string | null
   * @returns The response from the server.
   */
  deleteAccount(userName: string | null, password: string | null): Observable<ResponseI> {
    let deletePath = this.userPath + "/" + "Account/" + userName + "/" + password;
    return this.http.delete<ResponseI>(deletePath)
  }

  /**
   * It takes a form of type ActivityI and returns an observable of type any
   * @param {ActivityI} form - ActivityI
   * @returns The postActivity method returns an Observable of type any.
   */
  postActivity(form: ActivityI) {
    return this.http.post<any>(this.activityPath, form)
  }

  /**
   * This function takes a string as an argument and returns an observable of an array of UserI
   * objects.
   * @param {string} user - string - the user to search for
   * @returns An array of UserI objects.
   */
  searchUser(user: string): Observable<UserI[]> {
    let searchPath = this.userPath + "/" + "SearchUsers/" + user;
    return this.http.get<UserI[]>(searchPath)
  }

  /**
   * It returns an observable of an array of UserI objects
   * @returns An Observable of an array of UserI objects.
   */
  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.userPath)
  }

  /**
   * It takes a form object, and sends it to the server.
   * @param {AddFriendI} form - AddFriendI
   * @returns The response from the server.
   */
  addFriend(form: AddFriendI): Observable<ResponseI> {
    let addFriendPath = this.userPath + "/" + "AddFriend";
    return this.http.post<ResponseI>(addFriendPath, form)
  }

  /**
   * It takes a username as a parameter, and returns an observable of an array of UserI objects.
   * @param {any} username - any - the username of the user whose friend list you want to retrieve
   * @returns An array of UserI objects.
   */
  getFriendList(username: any): Observable<UserI[]> {
    let friendListPath = this.userPath + "/FriendsList/" + username;
    return this.http.get<UserI[]>(friendListPath)
  }

  /**
   * It deletes a friend from the database using the delete method.
   * @param {AddFriendI} form - AddFriendI
   * @returns The response from the server.
   */
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

  /**
   * This function returns an observable of an array of RaceI objects.
   * @returns An Observable of an array of RaceI objects.
   */
  getRaces(): Observable<RaceI[]> {
    return this.http.get<RaceI[]>(this.racePath)
  }

  /**
   * This function takes a username as a parameter and returns an observable of an array of RaceI
   * objects.
   * @param {any} username - any
   * @returns An array of RaceI objects.
   */
  getRacesByUserCategory(username: any): Observable<RaceI[]> {
    let categoryPath = this.racePath + "/ByUserCategory/" + username;
    return this.http.get<RaceI[]>(categoryPath)
  }

  /**
   * This function takes a JoinRaceI object and returns an Observable of type ResponseI.
   * @param {JoinRaceI} form - JoinRaceI
   * @returns The response from the server.
   */
  joinRace(form: JoinRaceI): Observable<ResponseI> {
    let joinPath = this.racePath + "/JoinRace";
    return this.http.post<ResponseI>(joinPath, form)
  }

  /**
   * It takes in an activityID, race_ID, and username, and then it returns an http.put request to the
   * path that is created by the parameters.
   * @param {any} activityID - the activity ID of the race
   * @param {any} race_ID - the ID of the race
   * @param {any} username - the username of the user who is finishing the race
   * @returns The return value is an observable of type any.
   */
  finishRace(activityID: any, race_ID: any, username: any) {
    let path = this.racePath + "/JoinRace/InputActivity/" + activityID + "/" + race_ID + "/" + username;
    return this.http.put<any>(path, null)
  }

  /**
   * This function returns an observable of an array of ChallengeI objects.
   * @returns An Observable of an array of ChallengeI objects.
   */
  getChallenges(): Observable<ChallengeI[]> {
    return this.http.get<ChallengeI[]>(this.challengePath)
  }

  /**
   * This function takes a username as a parameter and returns a promise of an array of numbers.
   * @param {any} username - string
   * @returns An Observable of type any.
   */
  getUserNumbers(username: any) {
    let path = this.userPath + "/UserNumbers/" + username;
    return this.http.get<any>(path)
  }

  /**
   * It takes a username, challengeId, and activityID and returns an Observable of type ResponseI
   * @param {any} username - string
   * @param {any} challengeId - the id of the challenge
   * @param {any} activityID - the activity that the user is joining the challenge for
   * @returns The response from the server.
   */
  joinChallenge(username: any, challengeId: any, activityID: any): Observable<ResponseI> {
    let joinPath = this.challengePath + "/JoinChallenge/" + username + "/" + challengeId + "/" + activityID;
    return this.http.post<ResponseI>(joinPath, null)
  }

  /**
   * This function takes a username and a challengeId and returns an Observable of type ResponseI.
   * @param {any} username - string
   * @param {any} challengeId - string
   * @returns The response from the server.
   */
  exitChallenge(username: any, challengeId: any): Observable<ResponseI> {
    let exitPath = this.challengePath + "/ExitChallenge/" + username + "/" + challengeId;
    return this.http.post<ResponseI>(exitPath, null)
  }

  /**
   * This function takes a username as a parameter and returns an observable of an array of RaceI
   * objects.
   * @param {any} username - any
   * @returns An array of RaceI objects.
   */
  getRaceByUser(username: any): Observable<RaceI[]> {
    let racesPath = this.racePath + "/UserJoins/" + username;
    return this.http.get<RaceI[]>(racesPath)
  }

  /**
   * This function takes a race_ID as a parameter, and returns a list of positions for that race_ID.
   * @param {any} race_ID - the ID of the race you want to get the leaderboard for
   * @returns An observable of type any.
   */
  getLeaderboard(race_ID: any) {
    let path = this.racePath + "/PositionList/" + race_ID;
    return this.http.get<any>(path)
  }

  /**
   * It takes a username as a parameter and returns an array of challenges that the user has joined
   * @param {any} username - any
   * @returns An array of ChallengeI objects.
   */
  getChallengeByUser(username: any): Observable<ChallengeI[]> {
    let challengePath = this.challengePath + "/UserJoins/" + username;
    return this.http.get<ChallengeI[]>(challengePath)
  }

  /**
   * This function returns a promise of an array of numbers.
   * @param {any} challengeId - the id of the challenge
   * @param {any} username - the username of the user who is logged in
   * @returns An Observable of type any.
   */
  getChallengeNumbers(challengeId: any, username: any) {
    let path = this.challengePath + "/ChallengeNumbers/" + challengeId + "/" + username;
    return this.http.get<any>(path)
  }

  /**
   * It takes in an activityID, challengeId, and username, and then returns an http.put request to the
   * path that is created by the function.
   * @param {any} activityID - the ID of the activity that the user is inputting
   * @param {any} challengeId - the id of the challenge
   * @param {any} username - the username of the user who is finishing the challenge
   * @returns The return value is an observable of type any.
   */
  finishChallenge(activityID: any, challengeId: any, username: any) {
    let path = this.challengePath + "/JoinChallenge/InputActivity/" + activityID + "/" + challengeId + "/" + username;
    return this.http.put<any>(path, null)
  }

  /**
   * This function returns an observable of an array of GroupI objects.
   * @returns An Observable of an array of GroupI objects.
   */
  getGroups(): Observable<GroupI[]> {
    let path = this.groupPath + "/AllObjects";
    return this.http.get<GroupI[]>(path)
  }

  /**
   * This function takes a username and a group name and returns an observable of type ResponseI.
   * @param {any} username - string
   * @param {any} group - string
   * @returns The response from the server.
   */
  joinGroup(username: any, group: any): Observable<ResponseI> {
    let joinPath = this.groupPath + "/JoinGroup/" + username + "/" + group;
    return this.http.post<ResponseI>(joinPath, null)
  }

  /**
   * It deletes a user from a group.
   * @param {any} username - string
   * @param {any} group - the group name
   * @returns The response from the server.
   */
  exitGroup(username: any, group: any): Observable<ResponseI> {
    let exitPath = this.groupPath + "/GroupMember/" + group + "/" + username;
    return this.http.post<ResponseI>(exitPath, null)
  }

  /**
   * This function gets the activities of the friends of the user with the username passed in as a
   * parameter.
   * @param {any} username - any - the username of the user whose friends activities you want to get
   * @returns An array of activities.
   */
  getFriendsActivities(username: any): Observable<ActivityI[]> {
    let activitesPath = this.userPath + "/FriendsActivities/" + username;
    return this.http.get<ActivityI[]>(activitesPath)
  }

  /**
   * This function takes a username as a parameter and returns an observable of an array of ActivityI
   * objects.
   * @param {any} username - any
   * @returns An Observable of an array of ActivityI objects.
   */
  getUserActivities(username: any): Observable<ActivityI[]> {
    let activitesPath = this.activityPath + "/ByUserName/" + username;
    return this.http.get<ActivityI[]>(activitesPath)
  }

  /**
   * This function returns an observable of an array of CommentI objects, which is the result of an
   * http get request to the path specified by the commentPath variable plus the string "/Activity/"
   * plus the string representation of the id parameter.
   * @param {number} id - number - the id of the activity
   * @returns An array of CommentI objects.
   */
  getActivityComments(id: number): Observable<CommentI[]> {
    let path = this.commentPath + "/Activity/" + id.toString();
    return this.http.get<CommentI[]>(path)
  }

  /**
   * It takes a CommentI object, sends it to the server, and returns a ResponseI object
   * @param {CommentI} form - CommentI
   * @returns The response from the server.
   */
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
  /**
   * This function returns an observable of type Activity, which is a class that has a bunch of
   * properties, and it gets the data from the API by calling the getActitityByIdPath, which is a
   * string that contains the URL of the API, and it passes in the id parameter, which is a number.
   * @param {number} id - number - the id of the activity to be retrieved
   * @returns An Observable of type Activity.
   */
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
  /**
   * This function asks the api for a group's members in the data base
   * @param name group's name
   * @returns member's information
   */
  getGroupMembers(name: string) {
    return this.http.get<Member[]>(this.groupMembersPath + name);
  }
  /**
   * This function asks the api for a race's accounts in the data base
   * @param id race Id
   * @returns BankAccount's information
   */
  getBankAccounts(id: number) {
    return this.http.get<Account[]>(this.AccountByIDPath + id);
  }
  /**
   * It returns an array of Participants objects.
   * @param {number} id - number
   * @returns An array of Participants
   */
  getPositionList(id: number) {
    return this.http.get<Participants[]>(this.positionListPath + id);
  }
  //DELETES
  /**
   * It deletes a member from a group.
   * @param {string} username - the username of the user to be deleted
   * @param {string} groupName - the name of the group
   * @returns The return value is an Observable.
   */
  deleteMember(username: string, groupName: string) {
    console.log(this.deleteGMemberPath + groupName + "/" + username);
    return this.http.delete(this.deleteGMemberPath + groupName + "/" + username);
  }
  /**
   * It deletes a race member from a race
   * @param {string} userName - the user name of the user who wants to exit the race
   * @param {number} raceId - number
   * @returns A string
   */
  deleteRaceMember(userName: string, raceId: number) {
    return this.http.delete<string>(this.exitRacePath + userName + "/" + raceId);
  }
  /* Deleting a group. */
  deleteGroup(name: string) {
    return this.http.delete(this.deleteGroupPath + name);

  }
  /**
   * It takes an id as a parameter and returns a string
   * @param {number} id - number
   * @returns A string
   */
  deleteChallenge(id: number) {
    return this.http.delete<string>(this.challengeById + id);
  }

  /**
   * It takes an id as a parameter, and returns a string
   * @param {number} id - number
   * @returns A string
   */
  deleteRace(id: number) {
    return this.http.delete<string>(this.deleteRacePath + id);
  }

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
