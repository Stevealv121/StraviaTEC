import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Participants } from 'src/app/models/participants';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-members-reports',
  templateUrl: './members-reports.component.html',
  styleUrls: ['./members-reports.component.css']
})
export class MembersReportsComponent implements OnInit {
  @ViewChild('content2', {static: false}) el!: ElementRef;
  participants:Participants[];
  constructor(private api:ApiService,private dataService:DataService) {
    this.participants=[];
   }

  ngOnInit(): void {
    this.loadPositonList();
  }
  loadPositonList(){
    this.api.getPositionList(this.dataService.raceId).subscribe((data:any) =>{
      this.participants =data;
  })
  }
  downloadPDF(){
    console.log("estoy aqui");
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save("MembersList.pdf");
      }
    })
  }

}
