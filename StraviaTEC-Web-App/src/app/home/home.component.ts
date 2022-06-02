import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivityI } from '../models/activity.interface';
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

  constructor(private data: DataService, private api: ApiService) {
  }
  routeMap: string = "assets/images/route-map.png";
  //friendsActivity = [{ name: "x", id: "1" }, { name: "x", id: "2" }, { name: "x", id: "3" }];
  friendsActivity: ActivityI[] = [];
  hasFriends: boolean = false;
  friendImage: string = "assets/images/avatar.png";
  isVisible: boolean = false;
  topComments: number[] = [1, 2];
  hasComments: boolean = false;
  viewComments: boolean = false;
  comments: number[] = [1, 2, 3, 4];
  gpxData: string = "assets/route1.gpx";
  apiToken = environment.MAPBOXAPIKEY;
  //@ViewChild('map', { read: ElementRef }) mapContainer!: ElementRef;
  user?: UserI;

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.checkIfHasComments();
    this.setFriendActivities();
    //this.loadAllRoutes();
  }

  setFriendActivities() {
    this.api.getFriendsActivities(this.user?.userName).subscribe(data => {
      this.friendsActivity = data;
      this.hasFriends = true;
    })
  }

  loadAllRoutes() {
    for (let i = 0; i < this.friendsActivity.length; i++) {
      var indexToString = (i + 1).toString();
      this.displayMap('map' + indexToString);
    }
  }

  displayMap(mapId: string) {

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

        var gpxLayer = omnivore.gpx(this.gpxData, null, customLayer)
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
  }
}
