import { Component, OnInit } from '@angular/core';
import { GroupsGest } from 'src/app/models/groups-gest';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  user:string;

  constructor(private api:ApiService, private dataService:DataService) {
    this.user="";
    if(this.dataService.currentUser && this.dataService.currentUser.userName != null){
      this.user = this.dataService.currentUser?.userName
    }
   }

  ngOnInit(): void {
  }

  /**
   * This function ask the api to create a new group
   * @param name name of the group
   * @param description the group's description
   */
  postGroup(name:string, description:string){
    var newGroup:GroupsGest = {
      username:this.user,
      name: name,
      description:description
    }
    this.api.postGroup(newGroup).subscribe((data:any)=>{
      console.log(data);
    })
  }

}
