import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
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

  constructor(private data: DataService, private api: ApiService, private sanitizer: DomSanitizer) {
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

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.profilePicture = this.user?.blob;
    this.setFriendActivities();
  }

  setComments(id: any) {
    this.api.getActivityComments(id).subscribe(data => {
      this.comments = data;
      for (let i = 0; i < data.length; i++) {
        if (i > 2) {
          console.log("o?");
          break;
        } else
          if (data.length > 2) {
            console.log("helo?");
            this.topComments.push(data[i]);
          }
      }
      this.checkIfHasComments();
      console.log("Comments");
      console.log(this.comments);
      console.log("TopComments");
      console.log(this.topComments);
      console.log(data[0]);
    })
  }

  setFriendActivities() {
    this.api.getFriendsActivities(this.user?.userName).subscribe(data => {
      this.friendsActivity = data;
      this.loadAllRoutes();
      this.hasFriends = true;
      for (let i = 0; i < this.friendsActivity.length; i++) {
        this.setComments(this.friendsActivity[i].activityId);
      }
    })
  }

  loadAllRoutes() {
    for (let i = 0; i < this.friendsActivity.length; i++) {
      var indexToString = this.friendsActivity[i].activityId?.toString();
      this.displayMap('map' + indexToString, this.friendsActivity[i].route, i);
    }
  }

  setRoute(data: any, i: any) {
    let objectURL = 'data:application/octet-stream;base64,' + data;
    this.friendsActivity[i].blobRoute = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    return this.friendsActivity[i].blobRoute
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

        //this.gpxData
        var gpxLayer = omnivore.gpx(routeGPX, null, customLayer)
          .on('ready', function () {
            map.fitBounds(gpxLayer.getBounds());
          }).addTo(map);

      }
    }, 100);
  }

  showComments() {
    this.isVisible = true;
    this.viewComments = false;
  }
  showLessComments() {
    this.isVisible = false;
    this.viewComments = true;
  }

  checkIfHasComments() {
    !this.topComments.length ? this.hasComments = false : this.hasComments = true;
    this.hasComments ? this.viewComments = true : this.viewComments = false;

    console.log(this.hasComments);
  }
}
