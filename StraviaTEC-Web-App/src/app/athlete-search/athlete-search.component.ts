import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private api: ApiService, private data: DataService, private sanitizer: DomSanitizer) { }

  athletes: UserI[] = [];

  searchForm = new FormGroup({
    firstName: new FormControl('')
  })

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * It takes a form, searches the database for the first name, and then sets the athletes array to the
   * data returned from the database.
   * @param {any} form - any
   */
  searchAthlete(form: any) {
    this.athletes = [];
    this.api.searchUser(form.firstName).subscribe(data => {
      console.log(data);
      this.athletes = data;
      this.athletes.forEach(element => {
        if (element.profilePicture == null) {
          element.blob = "assets/images/avatar.png"
        } else {
          let objectURL = 'data:image/jpeg;base64,' + element.profilePicture;
          element.blob = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
      this.setButtonInfo();
    })


  }

  /**
   * It gets all the users from the database, then removes the current user from the list of users.
   */
  getUsers() {
    this.api.getAllUsers().subscribe(data => {
      this.athletes = data;

      this.athletes.forEach(element => {
        if (element.profilePicture == null) {
          element.blob = "assets/images/avatar.png"
        } else {
          let objectURL = 'data:image/jpeg;base64,' + element.profilePicture;
          element.blob = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });

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

  /**
   * It gets a list of friends from the database, then loops through the list of athletes and sets the
   * button color and text to "following" if the athlete is in the list of friends.
   */
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

  /**
   * If the user is logged in, then if the button is 'Follow', then add the friend, else if the button
   * is 'Following', then delete the friend.
   * @param {any} friend - any, id: any
   * @param {any} id - the id of the button
   */
  addFriend(friend: any, id: any) {
    if (this.data.currentUser) {
      let form: AddFriendI = {
        userName: this.data.currentUser.userName,
        friendUserName: friend
      }
      this.athletes.forEach(element => {
        if (id == element.btnId && element.btn == 'Follow') {
          this.api.addFriend(form).subscribe(data => {
            console.log(data);
            element.color = 'white';
            element.font = '#00AF3D';
            element.btn = 'Following';
          })
        } else if (id == element.btnId && element.btn == 'Following') {
          this.api.deleteFriend(form).subscribe(data => {
            console.log(data);
            element.color = '#00AF3D';
            element.font = 'white';
            element.btn = 'Follow';
          })

        }
      })
    }
  }


}
