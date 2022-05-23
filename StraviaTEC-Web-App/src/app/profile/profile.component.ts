import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  @ViewChild('FND', { static: true }) FNDisplay!: ElementRef;
  @ViewChild('FNI', { static: true }) FNInput!: ElementRef;
  @ViewChild('FNS', { static: true }) FNSaveBtn!: ElementRef;
  @ViewChild('FNC', { static: true }) FNCloseBtn!: ElementRef;
  @ViewChild('FNE', { static: true }) FNEdit!: ElementRef;

  @ViewChild('SND', { static: true }) SNDisplay!: ElementRef;
  @ViewChild('SNI', { static: true }) SNInput!: ElementRef;
  @ViewChild('SNS', { static: true }) SNSaveBtn!: ElementRef;
  @ViewChild('SNC', { static: true }) SNCloseBtn!: ElementRef;
  @ViewChild('SNE', { static: true }) SNEdit!: ElementRef;

  @ViewChild('FSD', { static: true }) FSDisplay!: ElementRef;
  @ViewChild('FSI', { static: true }) FSInput!: ElementRef;
  @ViewChild('FSS', { static: true }) FSSaveBtn!: ElementRef;
  @ViewChild('FSC', { static: true }) FSCloseBtn!: ElementRef;
  @ViewChild('FSE', { static: true }) FSEdit!: ElementRef;

  @ViewChild('SSD', { static: true }) SSDisplay!: ElementRef;
  @ViewChild('SSI', { static: true }) SSInput!: ElementRef;
  @ViewChild('SSS', { static: true }) SSSaveBtn!: ElementRef;
  @ViewChild('SSC', { static: true }) SSCloseBtn!: ElementRef;
  @ViewChild('SSE', { static: true }) SSEdit!: ElementRef;

  @ViewChild('BDD', { static: true }) BDDisplay!: ElementRef;
  @ViewChild('BDI', { static: true }) BDInput!: ElementRef;
  @ViewChild('BDS', { static: true }) BDSaveBtn!: ElementRef;
  @ViewChild('BDC', { static: true }) BDCloseBtn!: ElementRef;
  @ViewChild('BDE', { static: true }) BDEdit!: ElementRef;

  @ViewChild('ND', { static: true }) NDisplay!: ElementRef;
  @ViewChild('NI', { static: true }) NInput!: ElementRef;
  @ViewChild('NS', { static: true }) NSaveBtn!: ElementRef;
  @ViewChild('NC', { static: true }) NCloseBtn!: ElementRef;
  @ViewChild('NE', { static: true }) NEdit!: ElementRef;

  @ViewChild('LD', { static: true }) LDisplay!: ElementRef;
  @ViewChild('LI', { static: true }) LInput!: ElementRef;
  @ViewChild('LS', { static: true }) LSaveBtn!: ElementRef;
  @ViewChild('LC', { static: true }) LCloseBtn!: ElementRef;
  @ViewChild('LE', { static: true }) LEdit!: ElementRef;

  url: string = 'assets/images/avatar.png';

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {

        this.url = reader.result as string;

        // this.registerForm.patchValue({
        //   profilePicture: reader.result
        // });

      };
    }
  }

  edit(set: any) {
    switch (set) {
      case "firstName":
        this.FNDisplay.nativeElement.setAttribute("hidden", true);
        this.FNEdit.nativeElement.setAttribute("hidden", true);
        this.FNInput.nativeElement.removeAttribute("hidden");
        this.FNSaveBtn.nativeElement.removeAttribute("hidden");
        this.FNCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "secondName":
        this.SNDisplay.nativeElement.setAttribute("hidden", true);
        this.SNEdit.nativeElement.setAttribute("hidden", true);
        this.SNInput.nativeElement.removeAttribute("hidden");
        this.SNSaveBtn.nativeElement.removeAttribute("hidden");
        this.SNCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "firstSurname":
        this.FSDisplay.nativeElement.setAttribute("hidden", true);
        this.FSEdit.nativeElement.setAttribute("hidden", true);
        this.FSInput.nativeElement.removeAttribute("hidden");
        this.FSSaveBtn.nativeElement.removeAttribute("hidden");
        this.FSCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "secondSurname":
        this.SSDisplay.nativeElement.setAttribute("hidden", true);
        this.SSEdit.nativeElement.setAttribute("hidden", true);
        this.SSInput.nativeElement.removeAttribute("hidden");
        this.SSSaveBtn.nativeElement.removeAttribute("hidden");
        this.SSCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "birthDate":
        this.BDDisplay.nativeElement.setAttribute("hidden", true);
        this.BDEdit.nativeElement.setAttribute("hidden", true);
        this.BDInput.nativeElement.removeAttribute("hidden");
        this.BDSaveBtn.nativeElement.removeAttribute("hidden");
        this.BDCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "nationality":
        this.NDisplay.nativeElement.setAttribute("hidden", true);
        this.NEdit.nativeElement.setAttribute("hidden", true);
        this.NInput.nativeElement.removeAttribute("hidden");
        this.NSaveBtn.nativeElement.removeAttribute("hidden");
        this.NCloseBtn.nativeElement.removeAttribute("hidden");
        break;
      case "level":
        this.LDisplay.nativeElement.setAttribute("hidden", true);
        this.LEdit.nativeElement.setAttribute("hidden", true);
        this.LInput.nativeElement.removeAttribute("hidden");
        this.LSaveBtn.nativeElement.removeAttribute("hidden");
        this.LCloseBtn.nativeElement.removeAttribute("hidden");
        break;
    }

    //console.log("editing");

  }

  cancel(set: any) {
    switch (set) {
      case "firstName":
        this.FNInput.nativeElement.setAttribute("hidden", true);
        this.FNSaveBtn.nativeElement.setAttribute("hidden", true);
        this.FNCloseBtn.nativeElement.setAttribute("hidden", true);
        this.FNDisplay.nativeElement.removeAttribute("hidden");
        this.FNEdit.nativeElement.removeAttribute("hidden");
        break;
      case "secondName":
        this.SNInput.nativeElement.setAttribute("hidden", true);
        this.SNSaveBtn.nativeElement.setAttribute("hidden", true);
        this.SNCloseBtn.nativeElement.setAttribute("hidden", true);
        this.SNDisplay.nativeElement.removeAttribute("hidden");
        this.SNEdit.nativeElement.removeAttribute("hidden");
        break;
      case "firstSurname":
        this.FSInput.nativeElement.setAttribute("hidden", true);
        this.FSSaveBtn.nativeElement.setAttribute("hidden", true);
        this.FSCloseBtn.nativeElement.setAttribute("hidden", true);
        this.FSDisplay.nativeElement.removeAttribute("hidden");
        this.FSEdit.nativeElement.removeAttribute("hidden");
        break;
      case "secondSurname":
        this.SSInput.nativeElement.setAttribute("hidden", true);
        this.SSSaveBtn.nativeElement.setAttribute("hidden", true);
        this.SSCloseBtn.nativeElement.setAttribute("hidden", true);
        this.SSDisplay.nativeElement.removeAttribute("hidden");
        this.SSEdit.nativeElement.removeAttribute("hidden");
        break;
      case "birthDate":
        this.BDInput.nativeElement.setAttribute("hidden", true);
        this.BDSaveBtn.nativeElement.setAttribute("hidden", true);
        this.BDCloseBtn.nativeElement.setAttribute("hidden", true);
        this.BDDisplay.nativeElement.removeAttribute("hidden");
        this.BDEdit.nativeElement.removeAttribute("hidden");
        break;
      case "nationality":
        this.NInput.nativeElement.setAttribute("hidden", true);
        this.NSaveBtn.nativeElement.setAttribute("hidden", true);
        this.NCloseBtn.nativeElement.setAttribute("hidden", true);
        this.NDisplay.nativeElement.removeAttribute("hidden");
        this.NEdit.nativeElement.removeAttribute("hidden");
        break;
      case "level":
        this.LInput.nativeElement.setAttribute("hidden", true);
        this.LSaveBtn.nativeElement.setAttribute("hidden", true);
        this.LCloseBtn.nativeElement.setAttribute("hidden", true);
        this.LDisplay.nativeElement.removeAttribute("hidden");
        this.LEdit.nativeElement.removeAttribute("hidden");
        break;
    }

  }

}
