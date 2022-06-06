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

  async confirm(blob: any) {
    //this.paymentChecker();
    /*if (!this.isEmpty) {
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
      this.toastr.success("Successfully inscripted to " + this.race.name + "!", "Success");
    }*/
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

  async onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {

        this.url = reader.result?.toString();
        this.blob = this.url.split(",", 2);
        this.paymentForm.patchValue({
          bill: this.blob[1]
        });

      }
      await new Promise(f => (setTimeout(f, 100)));
    }
  }

  /*paymentChecker() {
    if (this.mapContainer.nativeElement.files.length == 0) {
      console.log("no files selected");
    } else {
      this.isEmpty = false;
    }
  }*/

}
