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
  activeRaces = [{ name: "Race1", id: "1" }, { name: "Race2", id: "2" }];

  activityForm = new FormGroup({
    title: new FormControl(''),
    activity: new FormControl(''),
    date: new FormControl(''),
    duration: new FormControl(''),
    distance: new FormControl(''),
    route: new FormControl(''),
    competition: new FormControl(''),
    race: new FormControl('')
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

    let fullDuration = form.duration;

    let arrD = fullDuration.split("h");
    let arrDS = arrD[1].split("s");
    console.log(arrD);
    let duration = {
      hours: +arrD[0],
      minutes: +arrDS[0],
      ticks: 0,
      days: 0,
      milliseconds: 0,
      seconds: 0
    }


    if (this.data.currentUser) {
      let activity: ActivityI = {
        username: this.data.currentUser.userName,
        date: form.date,
        duration: duration,
        mileage: form.distance,
        route: ["string"],
        sportName: "Soccer",
        id: 1
      }

      this.api.postActivity(activity).subscribe(data => {
        console.log(data);
      })
    }

  }

}
