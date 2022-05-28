import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-activity',
  templateUrl: './upload-activity.component.html',
  styleUrls: ['./upload-activity.component.css']
})
export class UploadActivityComponent implements OnInit {

  constructor(private router: Router) { }

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

}
