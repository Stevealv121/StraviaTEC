import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Challenge } from 'src/app/models/challenge';
import { GroupsGest } from 'src/app/models/groups-gest';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-edit-challenge',
  templateUrl: './edit-challenge.component.html',
  styleUrls: ['./edit-challenge.component.css']
})
export class EditChallengeComponent implements OnInit {
  groups:GroupsGest[];
  categories:string[];
  id:number;
  activities:Activity[];
  user:string;

  constructor(private api:ApiService, private dataService:DataService) {
    this.groups =[];
    this.categories=[];
    this.id =dataService.challengeId;
    this.activities =[];
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
   }

  ngOnInit(): void {
    this.loadGroups();
    this.loadActities();
  }

  /**
   * This function request to the api for the activites
   */
   loadActities(){
    this.api.getUserActivities(this.user).subscribe((data:any)=>{ //change dennis for the username
      this.activities = data;
    })
  }

  /**
  * This function request to the api for the user's groups
  */
  loadGroups(){
    this.api.getGroupInfoByManagerId(this.user).subscribe((data:any)=>{// cambiar por el username correspondiente
      this.groups = data;
    })
  }
  /**
  * This function request to the api for the user's groups
  */
  loadCategories(){
    this.api.getCategory().subscribe((data:any)=>{// cambiar por el username correspondiente
      this.categories = data;
    })
  }
  /**
   * This fuctions ask to the API to update a challenge's Info
   * @param name challenge's name
   * @param date challenge's date
   * @param type challenge's type
   * @param activity challenge's activity
   * @param access challenge's access
   */
  updateChallenge(name:string, date:string, type:string,activity:string,access:string){
    var _access:string ="";
    if (access == "Public"){
      _access="Public";
    }else{
      _access = access.split(":", 2)[1];
    }
    var form:Challenge={
      id:this.id,
      validThru: date,
      type:type,
      access:_access,
      name:name,
      activityId:Number(activity.split(" ",2)[0])
    }
    this.api.putChallenge(form).subscribe((data:any)=>{

    })

  }
}
