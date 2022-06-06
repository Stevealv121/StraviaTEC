import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsGest } from 'src/app/models/groups-gest';
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

  constructor(private api:ApiService, private router:Router, private dataService:DataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.groups =[];
    this.groupName = this.dataService.groupId;
  }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(){
    this.api.getGroupInfoByManagerId("dennis").subscribe((data:any)=>{
      this.groups = data;
      //console.log("hola")
    })
  }
  updateGroup(description:string){
    var newGroup:GroupsGest = {
      username:"dennis",
      name: this.groupName,
      description:description
    }
    this.api.putGroup(newGroup).subscribe((data:any)=>{
      console.log(data);
    })
  }


}
