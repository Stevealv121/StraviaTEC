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
  selectedChallenge: any;
  selectedRace: any;
  finishing: any;

  ngOnInit(): void {
  }

  /**
   * If the user selects "Race" from the dropdown, then the function will call the API to get all the
   * races that the user has created and display them in a table. 
   * If the user selects "Challenge" from the dropdown, then the function will call the API to get all
   * the challenges that the user has created and display them in a table.
   */
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

  /**
   * When the user clicks the 'Put Challenge' button, the selectedChallenge variable is set to the
   * challengeOptionsModel variable, and the finishing variable is set to 'Challenge'.
   */
  putChallenge() {
    this.selectedChallenge = this.challengeOptionsModel;
    this.finishing = 'Challenge';
  }

  /**
   * The function is called when the user clicks the "Race" button. The function then sets the
   * selectedRace variable to the value of the selectedOption3 variable, and sets the finishing
   * variable to "Race".
   */
  putRace() {
    this.selectedRace = this.selectedOption3;
    this.finishing = 'Race';
  }

  /**
   * It takes the postedActivityID, selectedChallenge, and currentUser's userName and sends it to the
   * API to be processed. 
   * 
   * The postedActivityID is the ID of the activity that was just posted. 
   * 
   * The selectedChallenge is the challenge that the user selected from the dropdown. 
   * 
   * The currentUser's userName is the userName of the user that is currently logged in. 
   * 
   * The API then takes the postedActivityID, selectedChallenge, and currentUser's userName and
   * processes it. 
   * 
   * The API then returns a response. 
   * 
   * The response is then logged to the console.
   */
  finishChallenge() {
    this.api.finishChallenge(this.postedActivityID, this.selectedChallenge,
      this.data.currentUser?.userName).subscribe(data => {
        console.log(data);
      });
  }

  /**
   * This function is called when the user clicks the finish button, and it calls the finishRace
   * function in the api service, which sends a post request to the server with the postedActivityID,
   * selectedRace, and currentUser's userName.
   */
  finishRace() {
    this.api.finishRace(this.postedActivityID, this.selectedRace,
      this.data.currentUser?.userName).subscribe(data => {
        console.log(data);
      })
  }

  /**
   * It posts an activity to the database, then if the activity was part of a race or challenge, it
   * finishes the race or challenge.
   * 
   * @param {any} form - any
   */
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
        if (this.finishing == 'Race') {
          this.finishRace();

        } else if (this.finishing == 'Challenge') {
          this.finishChallenge();
        }
      });
      await new Promise(f => (setTimeout(f, 100)));
    }

    this.toastr.success("Activity successfully posted!", "Success");

  }


  /**
   * It takes a file, converts it to a base64 string, and then splits the string into two parts, the
   * first part being the file type, and the second part being the actual file.
   * 
   * @param {any} event - any - the event that is triggered when the file is uploaded
   */
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
