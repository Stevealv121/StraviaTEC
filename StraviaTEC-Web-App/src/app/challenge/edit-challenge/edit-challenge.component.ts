import { Component, OnInit } from '@angular/core';
import { GroupsGest } from 'src/app/models/groups-gest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-challenge',
  templateUrl: './edit-challenge.component.html',
  styleUrls: ['./edit-challenge.component.css']
})
export class EditChallengeComponent implements OnInit {
  groups:GroupsGest[];
  categories:string[];
  constructor(private api:ApiService) {
    this.groups =[];
    this.categories=[];
   }

  ngOnInit(): void {
    //this.loadGroups();
    //this.loadCategories();
  }

  /**
  * This function request to the api for the user's groups
  */
  loadGroups(){
    this.api.getGroupInfoByManagerId("dennis").subscribe((data:any)=>{// cambiar por el username correspondiente
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

}
