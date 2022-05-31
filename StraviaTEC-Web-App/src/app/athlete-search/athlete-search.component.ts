import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddFriendI } from '../models/addFriend.interface';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-athlete-search',
  templateUrl: './athlete-search.component.html',
  styleUrls: ['./athlete-search.component.css']
})
export class AthleteSearchComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }

  athletes: UserI[] = [];

  searchForm = new FormGroup({
    firstName: new FormControl('')
  })

  ngOnInit(): void {
    this.getUsers();
  }

  searchAthlete(form: any) {
    this.athletes = [];
    this.api.searchUser(form.firstName).subscribe(data => {
      console.log(data);
      this.athletes = data;
      this.setButtonInfo();
    })


  }

  getUsers() {
    this.api.getAllUsers().subscribe(data => {
      this.athletes = data;

      if (this.data.currentUser) {
        let index: any;
        for (let i = 0; i < this.athletes.length; i++) {
          if (this.athletes[i].userName == this.data.currentUser.userName) {
            index = i;
          }
        }
        this.athletes.splice(index, 1);
      }

      this.setButtonInfo();
    })
  }

  setButtonInfo() {
    if (this.data.currentUser) {
      this.api.getFriendList(this.data.currentUser.userName).subscribe(data => {
        console.log(data);
        for (let i = 0; i < this.athletes.length; i++) {
          this.athletes[i].btnId = i + 1;
          this.athletes[i].color = '#00AF3D';
          this.athletes[i].font = 'white';
          this.athletes[i].btn = 'Follow';
        }

        data.forEach(friend => {
          this.athletes.forEach(element => {

            if (element.userName == friend.friendUserName) {
              element.color = 'white';
              element.font = '#00AF3D';
              element.btn = 'Following';
            }

          })
        })

      })
    }
  }

  addFriend(friend: any, id: any) {
    if (this.data.currentUser) {
      let form: AddFriendI = {
        userName: this.data.currentUser.userName,
        friendUserName: friend
      }
      this.api.addFriend(form).subscribe(data => {
        console.log(data);
        this.athletes.forEach(element => {
          if (id == element.btnId) {
            element.color = 'white';
            element.font = '#00AF3D';
            element.btn = 'Following';
          }
        })
      })
    }
  }

}
