import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivityI } from '../models/activity.interface';
import { CommentI } from '../models/comment.interface';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

declare var omnivore: any;
declare var L: any;
const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {

  constructor(private data: DataService, private api: ApiService, private sanitizer: DomSanitizer) { }
  user?: UserI;
  myActivities: ActivityI[] = [];
  hasActivites: boolean = false;
  isVisible: boolean = false;
  //topComments: number[] = [1, 2];
  topComments: CommentI[] = [];
  hasComments: boolean = false;
  viewComments: boolean = false;
  //comments: number[] = [1, 2, 3, 4];
  comments: CommentI[] = [];
  gpxData: string = "assets/route1.gpx";
  apiToken = environment.MAPBOXAPIKEY;
  friendImage: string = "assets/images/avatar.png";
  commentForm = new FormGroup({
    new_comment: new FormControl('')
  });
  followers: any;
  following: any;
  number_activities: any;

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.setActivities();
    this.setUserNumbers();
  }

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

  displayMap(mapId: string, route: any, index: any) {
    console.log("This is the map: " + mapId);
    let routeGPX = this.setRoute(route, index);
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
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: this.apiToken
        }).addTo(map);

        var customLayer = L.geoJson(null, {
          style: myStyle
        });

        var gpxLayer = omnivore.gpx(routeGPX, null, customLayer)
          .on('ready', function () {
            map.fitBounds(gpxLayer.getBounds());
          }).addTo(map);

      }
    }, 100);
  }

  setActivities() {
    this.api.getUserActivities(this.user?.userName).subscribe(data => {
      this.myActivities = data;
      this.loadAllRoutes();
      this.hasActivites = true;
      for (let i = 0; i < this.myActivities.length; i++) {
        this.setComments(this.myActivities[i].id);
      }
    })
  }

  postComment(form: any, id: any) {
    let right_now = new Date();
    let new_comment: CommentI = {
      activity_id: id,
      author: this.user?.userName,
      content: form.new_comment,
      firstName: this.user?.firstName,
      lastName: this.user?.firstSurname,
      date: right_now.toISOString(),
      blobProfile: this.user?.blob
    }

    this.api.postComment(new_comment).subscribe(data => {
      console.log(data);
      this.comments.push(new_comment);
      this.showComments(id);
    })
  }

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

  loadAllRoutes() {
    for (let i = 0; i < this.myActivities.length; i++) {
      var indexToString = this.myActivities[i].id?.toString();
      this.displayMap('map' + indexToString, this.myActivities[i].route, i);
    }
  }

  setRoute(data: any, i: any) {
    //let objectURL = 'data:application/octet-stream;base64,' + data;
    let objectURL = 'data:application/gpx+xml;base64,' + data;
    return objectURL
  }

  showComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.lessComments = true;
        element.moreComments = false;
      }
    })
  }
  showLessComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.lessComments = false;
        element.moreComments = true;
      }
    })
  }

  checkIfHasComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.hasComments = true;
        element.moreComments = true;
      }
    })
  }

  setUserNumbers() {
    this.api.getUserNumbers(this.user?.userName).subscribe(data => {
      console.log(data);
      this.followers = data[0].followers;
      this.following = data[0].following;
      this.number_activities = data[0].activities;
    })
  }

}
