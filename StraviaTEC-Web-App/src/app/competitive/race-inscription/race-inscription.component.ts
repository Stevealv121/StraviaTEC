import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { format } from 'path';
import { JoinRaceI } from 'src/app/models/joinRace.interface';
import { RaceI } from 'src/app/models/race.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-race-inscription',
  templateUrl: './race-inscription.component.html',
  styleUrls: ['./race-inscription.component.css']
})
export class RaceInscriptionComponent implements OnInit {

  constructor(private data: DataService, private toastr: ToastrService, private api: ApiService) { }

  race!: RaceI;
  @ViewChild('inputPayment') mapContainer!: ElementRef;
  isEmpty: boolean = true;
  //billBlob: any;
  blob: string[] = [];
  url: any;

  paymentForm = new FormGroup({
    bill: new FormControl('')
  })

  ngOnInit(): void {
    console.log(this.data.selectedRace);
    if (this.data.selectedRace) {
      this.race = this.data.selectedRace;
    } else {
      console.log("no data");
    }
  }

  /**
   * It takes a blob, creates a form, sends the form to the API, waits 200ms, and then shows a toastr.
   * @param {any} blob - form.
   */
  async confirm(blob: any) {

    let form: JoinRaceI = {
      userName: this.data.currentUser?.userName,
      race_ID: this.race.id,
      bill: blob.bill,
      activityid: this.race.activityID
    }
    console.log(form);
    this.api.joinRace(form).subscribe(data => {
      console.log(data);
    });
    await new Promise(f => (setTimeout(f, 200)));
    this.toastr.success("Successfully inscripted to " + this.race.name + "!", "Success");
  }

  /**
   * It takes a file, converts it to a base64 string, and then splits the string into two parts, the
   * first part being the file type, and the second part being the actual file.
   * @param {any} event - any - the event that is triggered when the file is selected.
   */
  async onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {

        this.url = reader.result?.toString();
        console.log(this.url);
        this.blob = this.url.split(",", 2);
        console.log(this.blob[1]);
        this.paymentForm.patchValue({
          bill: this.blob[1]
        });

      }
      await new Promise(f => (setTimeout(f, 100)));
    }
  }

}
