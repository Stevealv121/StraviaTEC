import { Component, OnInit } from '@angular/core';
import { GroupsGest } from 'src/app/models/groups-gest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  /**
   * This function ask the api to create a new group
   * @param name name of the group
   * @param description the group's description
   */
  postGroup(name:string, description:string){
    var newGroup:GroupsGest = {
      username:"dennis",
      name: name,
      description:description
    }
    this.api.postGroup(newGroup).subscribe((data:any)=>{
      console.log(data);
    })
  }

}
