import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { GroupsGest } from '../models/groups-gest';
import { Race } from '../models/race';
import { Challenge } from '../models/challenge';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";
  getgroupInfoPath: string = this.url + "Group/ByManager/";
  getRaceManagerId: string = this.url + "Race/ByUserName/";
  getChallengeManagerId: string = this.url + "Challenge/ByUserName/";
  getSportsPath: string = this.url + "Sport";
  getSponsorPath:string = this.url + "Sponsor";
  getCategoryPath:string = this.url + "Category";
  groupPath:string = this.url + "Group";
  getActitvityUserPath:string=this.url +"Activity/ByUserName/";
  racespath:string=this.url +"Race";
  postSponsorpath:string=this.racespath + "/AssignRaceSponsor/";
  postBankAccountPath:string = this.racespath + "/BankAccount/";
  postChallengePath:string = this.url + "Challenge";



  login(userName: string, password: string): Observable<UserI> {

    let loginPath = this.userPath + "/" + userName + "/" + password;
    return this.http.get<UserI>(loginPath)
  }

  signUp(form: UserI): Observable<ResponseI> {
    return this.http.post<ResponseI>(this.userPath, form)
  }

  //POST
  /**
   * This function creates a new group in the database
   * @param form form with the group's information
   * @returns database's reponse
   */
  postGroup(form:GroupsGest){
    return this.http.post<GroupsGest>(this.groupPath, form);
  }
  /**
   * This function creates a new race in the database
   * @param form form with the race's information
   * @returns database's reponse
   */
  postRace(form:Race){
    return this.http.post<Race>(this.racespath, form);
  }
  /**
   * This function assings a sponsor to a race in the database
   * @param raceId race id
   * @param sponsorId sponsor id
   * @returns database's response
   */
  postRaceSponsor(raceId:string, sponsorId:string){
    return this.http.post<any>(this.postSponsorpath+raceId+"/"+sponsorId,null);
  }
  /**
   * This function assings a bank account to a race in the database
   * @param raceId race id
   * @param BankAccount account number
   * @returns database's response
   */
  postRaceAccount(raceId:string, BankAccount:string){
    return this.http.post<string>(this.postBankAccountPath+raceId+"/"+BankAccount,null);
  }
  /**
   * This function creates a new challenge un the database
   * @param form challenge type object
   * @returns api response
   */
  postChallenge(form:Challenge){
    return this.http.post<Challenge>(this.postChallengePath,form);
  }


  //GETS

  /**
   * This function asks the api for the groups created by username
   * @param username owner's username
   * @returns groups who belongs to the specified user
   */
  getGroupInfoByManagerId(username:string){
    return this.http.get<string[]>(this.getgroupInfoPath+username); //some problems maybe the http or https
  }
  /**
   * This function asks the api for the activities created by username
   * @param username owner's username
   * @returns activities who belongs to the specified user
   */
  getUserActivities(user:string){
    return this.http.get<string[]>(this.getActitvityUserPath+user);
  }
  /**
   * This function asks the api for the races created by the user.
   * @param username owner's username
   * @returns races created by the specified user
   */
  getRacesByManagerId(username:string){
    return this.http.get<string[]>(this.getRaceManagerId+username);
  }
  /**
   * This function asks the api for the challenges created by the user.
   * @param username owner's username
   * @returns Challenges created by the specified user
   */
  getChallengeByManagerId(username:string){
    return this.http.get<string[]>(this.getChallengeManagerId+username);
  }
  /**
   * This function asks the api for the sports in the data base
   * @returns sports in the data base
   */
  getSports(){
    return this.http.get<string[]>(this.getSportsPath);
  }
  /**
   This function asks the api for the sponsors in the data base
   * @returns sponsors in the data base
   */
  getSponsor(){
    return this.http.get<string[]>(this.getSponsorPath);
  }
  /**
   This function asks the api for the categories in the data base
   * @returns categories in the data base
   */
  getCategory(){
    return this.http.get<string[]>(this.getCategoryPath);
  }
  //DELETES

  //PUTS
  /**
   * This function updates a challenge in the data base
   * @param form challenge's information
   * @returns database reponse
   */
  putChallenge(form:Challenge){
    return this.http.put<Challenge>(this.postChallengePath,form);
  }
  /**
   * This function updates a race in the data base
   * @param form race's information
   * @returns database reponse
   */
  putRace(form:Race){
    return this.http.put<Race>(this.racespath,form);
  }
  /**
   * This function updates a group in the data base
   * @param form group's information
   * @returns database reponse
   */
   putGroup(form:GroupsGest){
    return this.http.put<GroupsGest>(this.groupPath,form);
  }



}
