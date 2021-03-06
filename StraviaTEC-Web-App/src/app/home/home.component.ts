import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { ActivityI } from '../models/activity.interface';
import { CommentI } from '../models/comment.interface';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

// declare var require: any

// const converter = require("@tmcw/togeojson");
// const fs = require("fs");
// const DOMParser = require("xmldom").DOMParser;

declare var omnivore: any;
declare var L: any;
const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService, private api: ApiService, private sanitizer: DomSanitizer,
    private app: AppComponent) {
  }
  routeMap: string = "assets/images/route-map.png";
  //friendsActivity = [{ name: "x", id: "1" }, { name: "x", id: "2" }, { name: "x", id: "3" }];
  friendsActivity: ActivityI[] = [];
  hasFriends: boolean = false;
  friendImage: string = "assets/images/avatar.png";
  isVisible: boolean = false;
  //topComments: number[] = [1, 2];
  topComments: CommentI[] = [];
  hasComments: boolean = false;
  viewComments: boolean = false;
  //comments: number[] = [1, 2, 3, 4];
  comments: CommentI[] = [];
  gpxData: string = "assets/route1.gpx";
  apiToken = environment.MAPBOXAPIKEY;
  //@ViewChild('map', { read: ElementRef }) mapContainer!: ElementRef;
  user?: UserI;
  profilePicture: any;
  followers: any;
  following: any;
  number_activities: any;

  commentForm = new FormGroup({
    new_comment: new FormControl('')
  })

  ngOnInit(): void {
    this.app.isHidden = false;
    this.user = this.data.currentUser;
    this.profilePicture = this.user?.blob;
    this.setFriendActivities();
    this.setUserNumbers();
  }

  /**
   * It gets the user's followers, following, and activities from the database and assigns them to the
   * variables in the component.
   * 
   */
  setUserNumbers() {
    this.api.getUserNumbers(this.user?.userName).subscribe(data => {
      console.log(data);
      this.followers = data[0].followers;
      this.following = data[0].following;
      this.number_activities = data[0].activities;
    })
  }

  /**
   * It takes the form data and the id of the activity, creates a new comment object, and then sends it
   * to the API. 
   * 
   * The API then returns the data, which is then pushed to the comments array. 
   * 
   * The showComments function is then called to update the comments section.
   * @param {any} form - any, id: any
   * @param {any} id - the id of the activity
   */
  postComment(form: any, id: any) {
    let right_now = new Date();
    let new_comment: CommentI = {
      activity_id: id,
      author: this.user?.userName,
      content: form.new_comment,
      firstName: this.user?.firstName,
      lastName: this.user?.firstSurname,
      date: right_now.toISOString(),
      blobProfile: this.profilePicture
    }

    this.api.postComment(new_comment).subscribe(data => {
      console.log(data);
      this.comments.push(new_comment);
      this.showComments(id);
    })
  }

  /**
   * It takes a string as a parameter, then it gets all the users from the database, then it loops
   * through all the users and checks if the username matches the parameter, if it does, it checks if
   * the user has a profile picture, if not, it sets the profile picture to a default image, if it
   * does, it sets the profile picture to the user's profile picture.
   * </code>
   * @param {any} author - string
   * @returns the profilePicture variable.
   */
  async setProfilePicture(author: any) {
    let profilePicture;
    this.api.getAllUsers().subscribe(data => {
      let allUsers = data;
      allUsers.forEach(element => {
        if (element.userName == author) {
          if (element.profilePicture == null) {
            profilePicture = "assets/images/avatar.png"
          } else {
            let objectURL = 'data:image/jpeg;base64,' + element.profilePicture;
            profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        } else {
          profilePicture = "assets/images/avatar.png"
        }
      })
    })
    await new Promise(f => (setTimeout(f, 500)));
    return profilePicture;
  }

  /**
   * I'm getting comments from a database, then I'm getting the profile picture of the author of the
   * comment, then I'm pushing the comment to an array.
   * @param {any} id - the id of the activity
   */
  setComments(id: any) {
    this.api.getActivityComments(id).subscribe(data => {
      let commentsMongo = data;
      console.log(commentsMongo);
      commentsMongo.forEach(element => {
        this.setProfilePicture(element.author).then(data => {
          console.log(data);
          element.blobProfile = data;
        })
      })
      let c = 0;
      commentsMongo.forEach(element => {
        if (c >= 2) {
          this.comments.push(element);
        }
        c++;
      })
      for (let i = 0; i < commentsMongo.length; i++) {
        if (i > 1) {
          break;
        } else
          if (commentsMongo.length >= 1) {
            this.topComments.push(commentsMongo[i]);
          }
      }
      this.checkIfHasComments(id);
    })
  }

  /**
   * This function gets the friends activities from the API and then calls the setComments function for
   * each activity.
   */
  setFriendActivities() {
    this.api.getFriendsActivities(this.user?.userName).subscribe(data => {
      this.friendsActivity = data;
      //console.log(this.friendsActivity);
      this.loadAllRoutes();
      this.hasFriends = true;
      for (let i = 0; i < this.friendsActivity.length; i++) {
        this.setComments(this.friendsActivity[i].activityId);
      }
    })
  }

  /**
   * For each activity in the array, create a map with the id of the activity and the route of the
   * activity.
   */
  loadAllRoutes() {
    for (let i = 0; i < this.friendsActivity.length; i++) {
      var indexToString = this.friendsActivity[i].activityId?.toString();
      this.displayMap('map' + indexToString, this.friendsActivity[i].route, i);
    }
  }

  /**
   * It takes a base64 encoded string and returns a URL that can be used to download the file
   * @param {any} data - any - this is the data that is returned from the API call.
   * @param {any} i - the index of the route in the array of routes
   * @returns The data is being returned as a string.
   */
  setRoute(data: any, i: any) {
    //let objectURL = 'data:application/octet-stream;base64,' + data;
    let objectURL = 'data:application/gpx+xml;base64,' + data;
    return objectURL
  }

  /* Creating a map with the id of the activity and the route of the activity. */
  displayMap(mapId: string, route: any, index: any) {
    console.log("This is the map: " + mapId);
    let routeGPX = this.setRoute(route, index);
    console.log(routeGPX);
    setTimeout(() => {
      const container = document.getElementById(mapId);
      if (container) {
        var myStyle = {
          "color": "#3949AB",
          "weight": 5,
          "opacity": 0.95
        };

        var map = L.map(mapId).setView(defaultCoords, defaultZoom);

        map.maxZoom = 100;

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: this.apiToken
        }).addTo(map);

        var customLayer = L.geoJson(null, {
          style: myStyle
        });

        //this.gpxData
        var gpxLayer = omnivore.gpx(routeGPX, null, customLayer)
          .on('ready', function () {
            map.fitBounds(gpxLayer.getBounds());
          }).addTo(map);

      }
    }, 100);
  }

  /**
   * It loops through an array of objects and if the activityId of the object matches the id passed in,
   * it sets the lessComments property to true and the moreComments property to false.
   * @param {any} id - any - the id of the activity
   */
  showComments(id: any) {

    this.friendsActivity.forEach(element => {
      if (element.activityId == id) {
        element.lessComments = true;
        element.moreComments = false;
      }
    })
  }
  /**
   * It's a function that loops through an array of objects and if the object's activityId matches the
   * id passed in, it sets the object's lessComments property to false and the object's moreComments
   * property to true.
   * @param {any} id - the id of the activity
   */
  showLessComments(id: any) {

    this.friendsActivity.forEach(element => {
      if (element.activityId == id) {
        element.lessComments = false;
        element.moreComments = true;
      }
    })
  }

  /**
   * It checks if the activity has comments and if it does, it sets the hasComments property to true
   * and the moreComments property to true.
   * @param {any} id - the id of the activity
   */
  checkIfHasComments(id: any) {

    this.friendsActivity.forEach(element => {
      if (element.activityId == id) {
        element.hasComments = true;
        element.moreComments = true;
      }
    })
  }
}
