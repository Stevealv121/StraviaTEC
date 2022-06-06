import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsGest } from 'src/app/models/groups-gest';
import { Member } from 'src/app/models/member';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-group-gestion',
  templateUrl: './group-gestion.component.html',
  styleUrls: ['./group-gestion.component.css']
})
export class GroupGestionComponent implements OnInit {

  groups: GroupsGest[];
  groupName:string;
  members:Member[];
  user:string;

  constructor(private api:ApiService, private router:Router, private dataService:DataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.groups =[];
    this.groupName = this.dataService.groupId;
    this.members =[];
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
  }

  ngOnInit(): void {
    this.cargarTabla();
    this.getMembers();
  }

  cargarTabla(){
    this.api.getGroupInfoByManagerId(this.user).subscribe((data:any)=>{
      this.groups = data;
      //console.log("hola")
    })
  }
  updateGroup(description:string){
    var newGroup:GroupsGest = {
      username:this.user,
      name: this.groupName,
      description:description
    }
    this.api.putGroup(newGroup).subscribe((data:any)=>{
      console.log(data);
    })
  }
  /**
   * This function asks to the api the group's memebers
   */
  getMembers(){
    this.api.getGroupMembers(this.dataService.groupId).subscribe((data:any)=>{
      this.members = data;
    })
  }
  /**
   * This function asks the api to delete a member of a group
   * @param username member's username
   */
  async deleteMember(username:string){
    //var _name = this.groupName.replace(" ", "20%");
    //console.log(_name);
    this.api.deleteMember(username,this.groupName).subscribe((data:any)=>{

    });
    await new Promise(f => setTimeout(f, 500))
    this.ngOnInit()
  }



}
