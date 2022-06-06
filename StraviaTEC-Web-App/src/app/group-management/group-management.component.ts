import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsGest } from '../models/groups-gest';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {

  groups: GroupsGest[];
  user:string;

  constructor(private api:ApiService, private router:Router, private dataService:DataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.groups =[];
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
  }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(){
    this.api.getGroupInfoByManagerId(this.user).subscribe((data:any)=>{
      this.groups = data;
    })
  }
  /**
   * This function saves de id of the selected group
   * @param id group's id
   */
  saveGroupId(id:string){
    this.dataService.groupId=id;
  }
  /**
   * This function asks the api to delete a member of a group
   * @param name name of the group
   */
  async deleteGroup(name:string){
    this.api.deleteGroup(name).subscribe((data:any)=>{

    });
    await new Promise(f => setTimeout(f, 500))
    this.ngOnInit()
  }

}
