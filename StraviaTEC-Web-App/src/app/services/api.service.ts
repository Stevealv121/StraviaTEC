import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserI } from '../models/user.interface';
import { ResponseI } from '../models/response.interface';
import { GroupsGest } from '../models/groups-gest';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string = "https://localhost:7060/api/";
  userPath: string = this.url + "User";
  getgroupInfoPath: string = this.url + "Group/ByManager/";
  getRaceManagerId: string = this.url + "Race/ByManagerId/";
  getChallengeManagerId: string = this.url + "Challenge/ByManagerId/";
  getSportsPath: string = this.url + "Sport";
  getSponsorPath:string = this.url + "Sponsor";
  getCategoryPath:string = this.url + "Category";
  groupPath:string = this.url + "Group";



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


}
