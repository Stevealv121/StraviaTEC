import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor() { }
  groupsMatrix = [[{ id: 1, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 2, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 3, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 4, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 5, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false }],
  [{ id: 6, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 7, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 8, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false },
  { id: 9, color: '#00AF3D', font: 'white', btn: 'Join Group', active: false }]];

  ngOnInit(): void {
  }

  joinGroup(id: number) {
    this.groupsMatrix.forEach(element => {
      element.forEach(group => {
        if (id == group.id) {
          if (!group.active) {
            group.color = 'white';
            group.font = '#00AF3D';
            group.btn = 'Group Joined';
            group.active = true;
          } else {
            group.color = '#00AF3D';
            group.font = 'white';
            group.btn = 'Join Group';
            group.active = false;
          }
        }
      })
    });
  }

}
