import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityI } from '../models/activity.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-upload-activity',
  templateUrl: './upload-activity.component.html',
  styleUrls: ['./upload-activity.component.css']
})
export class UploadActivityComponent implements OnInit {

  constructor(private router: Router, private data: DataService, private api: ApiService) { }

  selectedOption: any;
  selectedOption2: any;
  selectedOption3: any;
  sportModel: any;
  activeRaces = [{ name: "Race1", id: "1" }, { name: "Race2", id: "2" }];
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
    sport: new FormControl('')
  });

  isRaceHidden: boolean = true;

  ngOnInit(): void {
  }

  submit() {
    this.router.navigateByUrl("race-inscription");
  }

  setRaceVisibility() {
    if (this.selectedOption2 == "Race") {
      this.isRaceHidden = false;
    } else {
      this.isRaceHidden = true;
    }
  }

  uploadActivity(form: any) {

    // let arrHours = fullDuration.split("h");
    // let arrMinutes = arrHours[1].split("m");
    // let arrSeconds = arrMinutes[1].split("s");
    // let duration;


    if (this.data.currentUser) {
      let activity: ActivityI = {
        username: this.data.currentUser.userName,
        date: form.date,
        duration: form.duration,
        mileage: form.distance,
        route: null,
        sportName: form.sport
      }

      this.api.postActivity(activity).subscribe(data => {
        console.log(data);
      })
    }

  }

}
