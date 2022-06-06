import { Component, OnInit } from '@angular/core';
import { GroupI } from '../models/group.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }
  // groupsMatrix = [[{ id: 1, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 2, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 3, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 4, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 5, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false }],
  // [{ id: 6, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 7, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 8, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  // { id: 9, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false }]];

  groupsMatrix: GroupI[][] = [];

  ngOnInit(): void {
    this.setMatrix();
  }

  joinGroup(id: any) {
    this.groupsMatrix.forEach(element => {
      element.forEach(group => {
        if (id == group.name) {
          if (!group.active) {
            this.api.joinGroup(this.data.currentUser?.userName, group.name).subscribe(data => {
              console.log(data);
              group.color = 'white';
              group.font = '#00AF3D';
              group.btn = 'Group Joined';
              group.active = true;
            })
          } else {
            this.api.exitGroup(this.data.currentUser?.userName, group.name).subscribe(data => {
              console.log(data);
              group.color = '#00AF3D';
              group.font = 'white';
              group.btn = 'Join Group';
              group.active = false;
            })
          }
        }
      })
    });
  }

  setMatrix() {
    this.api.getGroups().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let n = i % 5;
        if (n == 0) {
          let array: GroupI[] = [];
          for (let is = 0; is < 5; is++) {
            if (data[i + is]) {
              array.push(this.setButtonsValues(data[i + is]));
            }
          }
          this.groupsMatrix.push(array);
        }
      }
    })
  }

  setButtonsValues(data: GroupI) {
    let dataFormatted: GroupI = {
      username: data.username,
      name: data.name,
      description: data.description,
      //Buttons
      color: '#00AF3D',
      font: 'white',
      btn: 'Join Group',
      active: false
    }

    return dataFormatted
  }

}
