import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityI } from '../models/activity.interface';
import { ChallengeI } from '../models/challenge.interface';
import { RaceI } from '../models/race.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-upload-activity',
  templateUrl: './upload-activity.component.html',
  styleUrls: ['./upload-activity.component.css']
})
export class UploadActivityComponent implements OnInit {

  constructor(private router: Router, private data: DataService, private api: ApiService,
    private toastr: ToastrService) { }

  selectedOption: any;
  selectedOption2: any;
  selectedOption3: any;
  sportModel: any;
  challengeOptionsModel: any;
  isChallengeHidden: boolean = true;
  // activeRaces = [{ name: "Race1", id: "1" }, { name: "Race2", id: "2" }];
  activeRaces: RaceI[] = [];
  activeChallenges: ChallengeI[] = [];
  sports = [{ name: "Running", id: "1" }, { name: "Swimming", id: "2" }, { name: "Cycling", id: "3" },
  { name: "Hiking", id: "4" }, { name: "Kayaking", id: "5" }, { name: "Walking", id: "6" }];

  activityForm = new FormGroup({
    title: new FormControl(''),
    activity: new FormControl(''),
    date: new FormControl(''),
    duration: new FormControl(''),
    distance: new FormControl(''),
    route: new FormControl(''),
    competition: new FormControl(''),
    race: new FormControl(''),
    challenge: new FormControl(''),
    sport: new FormControl('')
  });

  isRaceHidden: boolean = true;
  fileBlob: any;
  blob: string[] = [];
  postedActivityID: any;

  ngOnInit(): void {
  }

  setRaceVisibility() {
    if (this.selectedOption2 == "Race") {
      this.api.getRaceByUser(this.data.currentUser?.userName).subscribe(data => {
        this.activeRaces = data;
      })
      this.isRaceHidden = false;
    } else {
      this.isRaceHidden = true;
    }
    if (this.selectedOption2 == "Challenge") {
      this.api.getChallengeByUser(this.data.currentUser?.userName).subscribe(data => {
        if (data.length != 0) {
          this.activeChallenges = data;
          this.isChallengeHidden = false;
        }
      })
    } else {
      this.isChallengeHidden = true;
    }
  }

  putChallenge() {
    this.api.finishChallenge(this.postedActivityID, this.challengeOptionsModel,
      this.data.currentUser?.userName).subscribe(data => {
        console.log(data);
      })
  }

  // getPostedActivityID(){
  //   this.api.getActivityById()
  // }

  async uploadActivity(form: any) {

    if (this.data.currentUser) {
      let activity: ActivityI = {
        username: this.data.currentUser.userName,
        date: form.date,
        duration: form.duration,
        mileage: form.distance,
        route: form.route,
        sportName: form.sport,
        friendUserName: null,
        level: null,
        activityId: null,
        firstName: null,
        secondName: null,
        firstSurname: null,
        secondSurname: null,
        birthDate: null,
        nationality: null,
        profilePicture: null,
        id: null,
        blobRoute: null,
        hasComments: false,
        lessComments: false,
        moreComments: false,
      }

      this.api.postActivity(activity).subscribe(data => {
        console.log(data);
        this.postedActivityID = data;
      });
      await new Promise(f => (setTimeout(f, 100)));
    }

    this.toastr.success("Activity successfully posted!", "Success");

  }


  async uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {
        this.fileBlob = reader.result?.toString();
        this.blob = this.fileBlob.split(",", 2);
        this.activityForm.patchValue({
          route: this.blob[1]
        });
      }

      await new Promise(f => (setTimeout(f, 100)));
    }
  }

}
