import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  ngOnInit(): void {
    console.log(this.data.selectedRace);
    if (this.data.selectedRace) {
      this.race = this.data.selectedRace;
    } else {
      console.log("no data");
    }
  }

  confirm() {
    this.paymentChecker();
    if (!this.isEmpty) {
      this.api.joinRace(this.data.currentUser?.userName, this.race.id).subscribe(data => {
        console.log(data);
      })
      this.toastr.success("Successfully inscripted to " + this.race.name + "!", "Success");
    }
  }

  paymentChecker() {
    if (this.mapContainer.nativeElement.files.length == 0) {
      console.log("no files selected");
    } else {
      this.isEmpty = false;
    }
  }

}
