import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsGest } from 'src/app/models/groups-gest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-group-gestion',
  templateUrl: './group-gestion.component.html',
  styleUrls: ['./group-gestion.component.css']
})
export class GroupGestionComponent implements OnInit {

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
      //console.log("hola")
    })
  }

}
