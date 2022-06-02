import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsGest } from '../models/groups-gest';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {

  groups: GroupsGest[];

  constructor(private api:ApiService, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.groups =[];
  }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(){
    this.api.getGroupInfoByManagerId("dennis").subscribe((data:any)=>{
      this.groups = data;
    })
  }

}
