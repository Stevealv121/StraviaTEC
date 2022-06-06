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

  /**
   * It takes a string as a parameter, then it gets all the users from the database, then it loops
   * through all the users and checks if the username matches the parameter, if it does, it checks if
   * the user has a profile picture, if not, it sets the profile picture to a default image, if it
   * does, it sets the profile picture to the user's profile picture.
   * 
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
   * It display a map with a route on it. The route is a GPX file that it loads from a
   * URL. 
   * 
   * @param {string} mapId - string - the id of the div that will contain the map
   * @param {any} route - this is the route object that contains the GPX data
   * @param {any} index - the index of the route in the array of routes
   */
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

  /**
   * It gets the user's activities from the database, then loads all the routes, then sets the
   * hasActivities variable to true, then for each activity, it gets the comments for that activity.
   */
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
      blobProfile: this.user?.blob
    }

    this.api.postComment(new_comment).subscribe(data => {
      console.log(data);
      this.comments.push(new_comment);
      this.showComments(id);
    })
  }

  /**
   * It gets the comments from the database, then it gets the profile picture of the author of the
   * comment, then it pushes the comment to an array.
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
   * For each activity in myActivities, create a map with the id of map + the activity's id, and
   * display the route on the map.
   */
  loadAllRoutes() {
    for (let i = 0; i < this.myActivities.length; i++) {
      var indexToString = this.myActivities[i].id?.toString();
      this.displayMap('map' + indexToString, this.myActivities[i].route, i);
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

  /**
   * It loops through the array of objects and if the id of the object matches the id passed in, it
   * sets the lessComments property to true and the moreComments property to false.
   * @param {any} id - the id of the activity
   */
  showComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.lessComments = true;
        element.moreComments = false;
      }
    })
  }
  /**
   * It loops through the array of objects and if the id of the object matches the id passed in, it
   * sets the lessComments property to false and the moreComments property to true.
   * @param {any} id - the id of the activity
   */
  showLessComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.lessComments = false;
        element.moreComments = true;
      }
    })
  }

  /**
   * It checks if the activity has comments and if it does, it sets the hasComments property to true.
   * @param {any} id - the id of the activity
   */
  checkIfHasComments(id: any) {

    this.myActivities.forEach(element => {
      if (element.id == id) {
        element.hasComments = true;
        element.moreComments = true;
      }
    })
  }

  /**
   * It gets the user's followers, following, and activities from the database and assigns them to the
   * variables in the component.
   * </code>
   */
  setUserNumbers() {
    this.api.getUserNumbers(this.user?.userName).subscribe(data => {
      console.log(data);
      this.followers = data[0].followers;
      this.following = data[0].following;
      this.number_activities = data[0].activities;
    })
  }

}
