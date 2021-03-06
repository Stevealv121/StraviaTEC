import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private data: DataService, private api: ApiService, private sanitizer: DomSanitizer) {
  }

  profileForm = new FormGroup({
    nationality: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    firstSurname: new FormControl(''),
    secondSurname: new FormControl(''),
    profilePicture: new FormControl(''),
    level: new FormControl(''),
    password: new FormControl(''),
    birthDate: new FormControl('')
  })

  selectedOption: any;

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

  url: any = 'assets/images/avatar.png';
  user?: UserI;
  blob: string[] = []
  nationOptions: any;
  nationalities = [{ NationalityID: 1, CountryCode: 'GB', Nationality: 'British' },
  { NationalityID: 34, CountryCode: 'AF', Nationality: 'Afghan' },
  { NationalityID: 35, CountryCode: 'AL', Nationality: 'Albanian' },
  { NationalityID: 36, CountryCode: 'DZ', Nationality: 'Algerian' },
  { NationalityID: 158, CountryCode: 'US', Nationality: 'American' },
  { NationalityID: 38, CountryCode: 'AD', Nationality: 'Andorran' },
  { NationalityID: 39, CountryCode: 'AO', Nationality: 'Angolan' },
  { NationalityID: 40, CountryCode: 'AM', Nationality: 'Armenian' },
  { NationalityID: 41, CountryCode: 'AT', Nationality: 'Austrian' },
  { NationalityID: 42, CountryCode: 'AZ', Nationality: 'Azerbaijani' },
  { NationalityID: 2, CountryCode: 'AR', Nationality: 'Argentinian' },
  { NationalityID: 3, CountryCode: 'AU', Nationality: 'Australian' },
  { NationalityID: 43, CountryCode: 'BH', Nationality: 'Bahraini' },
  { NationalityID: 44, CountryCode: 'BD', Nationality: 'Bangladeshi' },
  { NationalityID: 45, CountryCode: 'BB', Nationality: 'Barbadian' },
  { NationalityID: 46, CountryCode: 'BY', Nationality: 'Belarusian' },
  { NationalityID: 47, CountryCode: 'BZ', Nationality: 'Belizean' },
  { NationalityID: 48, CountryCode: 'BJ', Nationality: 'Beninese' },
  { NationalityID: 49, CountryCode: 'BM', Nationality: 'Bermudian' },
  { NationalityID: 50, CountryCode: 'BT', Nationality: 'Bhutanese' },
  { NationalityID: 51, CountryCode: 'BO', Nationality: 'Bolivian' },
  { NationalityID: 52, CountryCode: 'BA', Nationality: 'Bosnian' },
  { NationalityID: 53, CountryCode: 'BW', Nationality: 'Botswanan' },
  { NationalityID: 54, CountryCode: 'BG', Nationality: 'Bulgarian' },
  { NationalityID: 55, CountryCode: 'BF', Nationality: 'Burkinese' },
  { NationalityID: 56, CountryCode: 'BI', Nationality: 'Burundian' },
  { NationalityID: 7, CountryCode: 'CA', Nationality: 'Canadian' },
  { NationalityID: 8, CountryCode: 'CN', Nationality: 'Chinese' },
  { NationalityID: 9, CountryCode: 'CO', Nationality: 'Colombian' },
  { NationalityID: 10, CountryCode: 'CU', Nationality: 'Cuban' },
  { NationalityID: 57, CountryCode: 'KH', Nationality: 'Cambodian' },
  { NationalityID: 58, CountryCode: 'CM', Nationality: 'Cameroonian' },
  { NationalityID: 59, CountryCode: 'CV', Nationality: 'Cape Verdean' },
  { NationalityID: 60, CountryCode: 'TD', Nationality: 'Chadian' },
  { NationalityID: 61, CountryCode: 'CL', Nationality: 'Chilean' },
  { NationalityID: 62, CountryCode: 'CG', Nationality: 'Congolese' },
  { NationalityID: 63, CountryCode: 'CR', Nationality: 'Costa Rican' },
  { NationalityID: 64, CountryCode: 'HR', Nationality: 'Croat' },
  { NationalityID: 65, CountryCode: 'CY', Nationality: 'Cypriot' },
  { NationalityID: 66, CountryCode: 'CZ', Nationality: 'Czech' },
  { NationalityID: 67, CountryCode: 'DK', Nationality: 'Danish' },
  { NationalityID: 11, CountryCode: 'DO', Nationality: 'Dominican' },
  { NationalityID: 68, CountryCode: 'DJ', Nationality: 'Djiboutian' },
  { NationalityID: 69, CountryCode: 'DM', Nationality: 'Dominican' },
  { NationalityID: 26, CountryCode: 'NL', Nationality: 'Dutch' },
  { NationalityID: 12, CountryCode: 'EC', Nationality: 'Ecuadorean' },
  { NationalityID: 70, CountryCode: 'EG', Nationality: 'Egyptian' },
  { NationalityID: 71, CountryCode: 'ER', Nationality: 'Eritrean' },
  { NationalityID: 72, CountryCode: 'EE', Nationality: 'Estonian' },
  { NationalityID: 73, CountryCode: 'ET', Nationality: 'Ethiopian' },
  { NationalityID: 74, CountryCode: 'FJ', Nationality: 'Fijian' },
  { NationalityID: 75, CountryCode: 'FI', Nationality: 'Finnish' },
  { NationalityID: 76, CountryCode: 'PF', Nationality: 'French Polynesian' },
  { NationalityID: 14, CountryCode: 'FR', Nationality: 'French' },
  { NationalityID: 77, CountryCode: 'GA', Nationality: 'Gabonese' },
  { NationalityID: 78, CountryCode: 'GM', Nationality: 'Gambian' },
  { NationalityID: 79, CountryCode: 'GE', Nationality: 'Georgian' },
  { NationalityID: 15, CountryCode: 'DE', Nationality: 'German' },
  { NationalityID: 16, CountryCode: 'GT', Nationality: 'Guatemalan' },
  { NationalityID: 80, CountryCode: 'GH', Nationality: 'Ghanaian' },
  { NationalityID: 81, CountryCode: 'GR', Nationality: 'Greek' },
  { NationalityID: 82, CountryCode: 'GD', Nationality: 'Grenadian' },
  { NationalityID: 83, CountryCode: 'GN', Nationality: 'Guinean' },
  { NationalityID: 84, CountryCode: 'GY', Nationality: 'Guyanese' },
  { NationalityID: 17, CountryCode: 'HT', Nationality: 'Haitian' },
  { NationalityID: 18, CountryCode: 'HN', Nationality: 'Honduran' },
  { NationalityID: 85, CountryCode: 'HU', Nationality: 'Hungarian' },
  { NationalityID: 19, CountryCode: 'IN', Nationality: 'Indian' },
  { NationalityID: 20, CountryCode: 'IE', Nationality: 'Ireland' },
  { NationalityID: 21, CountryCode: 'IL', Nationality: 'Israeli' },
  { NationalityID: 22, CountryCode: 'IT', Nationality: 'Italian' },
  { NationalityID: 86, CountryCode: 'IS', Nationality: 'Icelandic' },
  { NationalityID: 87, CountryCode: 'ID', Nationality: 'Indonesian' },
  { NationalityID: 88, CountryCode: 'IR', Nationality: 'Iranian' },
  { NationalityID: 89, CountryCode: 'IQ', Nationality: 'Iraqi' },
  { NationalityID: 23, CountryCode: 'JP', Nationality: 'Japanese' },
  { NationalityID: 90, CountryCode: 'JM', Nationality: 'Jamaican' },
  { NationalityID: 91, CountryCode: 'JO', Nationality: 'Jordanian' },
  { NationalityID: 92, CountryCode: 'KZ', Nationality: 'Kazakh' },
  { NationalityID: 93, CountryCode: 'KE', Nationality: 'Kenyan' },
  { NationalityID: 94, CountryCode: 'KP', Nationality: 'North Korean' },
  { NationalityID: 95, CountryCode: 'KW', Nationality: 'Kuwaiti' },
  { NationalityID: 96, CountryCode: 'LV', Nationality: 'Latvian' },
  { NationalityID: 97, CountryCode: 'LB', Nationality: 'Lebanese' },
  { NationalityID: 98, CountryCode: 'LR', Nationality: 'Liberian' },
  { NationalityID: 99, CountryCode: 'LY', Nationality: 'Libyan' },
  { NationalityID: 100, CountryCode: 'LT', Nationality: 'Lithuanian' },
  { NationalityID: 101, CountryCode: 'LU', Nationality: 'LUXEMBOURG' },
  { NationalityID: 102, CountryCode: 'MG', Nationality: 'Madagascan' },
  { NationalityID: 103, CountryCode: 'MW', Nationality: 'Malawian' },
  { NationalityID: 104, CountryCode: 'MY', Nationality: 'Malaysian' },
  { NationalityID: 105, CountryCode: 'MV', Nationality: 'Maldivian' },
  { NationalityID: 106, CountryCode: 'ML', Nationality: 'Malian' },
  { NationalityID: 107, CountryCode: 'MT', Nationality: 'Maltese' },
  { NationalityID: 108, CountryCode: 'MR', Nationality: 'Mauritanian' },
  { NationalityID: 109, CountryCode: 'MU', Nationality: 'Mauritian' },
  { NationalityID: 110, CountryCode: 'MC', Nationality: 'Monacan' },
  { NationalityID: 111, CountryCode: 'MN', Nationality: 'Mongolian' },
  { NationalityID: 112, CountryCode: 'ME', Nationality: 'Montenegrin' },
  { NationalityID: 113, CountryCode: 'MA', Nationality: 'Moroccan' },
  { NationalityID: 114, CountryCode: 'MZ', Nationality: 'Mozambican' },
  { NationalityID: 25, CountryCode: 'MX', Nationality: 'Mexican' },
  { NationalityID: 115, CountryCode: 'NA', Nationality: 'Namibian' },
  { NationalityID: 116, CountryCode: 'NP', Nationality: 'Nepalese' },
  { NationalityID: 117, CountryCode: 'NZ', Nationality: 'New Zealand' },
  { NationalityID: 118, CountryCode: 'NI', Nationality: 'Nicaraguan' },
  { NationalityID: 119, CountryCode: 'NE', Nationality: 'Nigerien' },
  { NationalityID: 120, CountryCode: 'NG', Nationality: 'Nigerian' },
  { NationalityID: 121, CountryCode: 'NO', Nationality: 'Norwegian' },
  { NationalityID: 122, CountryCode: 'OM', Nationality: 'Omani' },
  { NationalityID: 123, CountryCode: 'PK', Nationality: 'Pakistani' },
  { NationalityID: 124, CountryCode: 'PA', Nationality: 'Panamanian' },
  { NationalityID: 125, CountryCode: 'PG', Nationality: 'Guinean' },
  { NationalityID: 126, CountryCode: 'PY', Nationality: 'Paraguayan' },
  { NationalityID: 127, CountryCode: 'PE', Nationality: 'Peruvian' },
  { NationalityID: 27, CountryCode: 'PH', Nationality: 'Philippine' },
  { NationalityID: 128, CountryCode: 'PL', Nationality: 'Polish' },
  { NationalityID: 129, CountryCode: 'PT', Nationality: 'Portuguese' },
  { NationalityID: 130, CountryCode: 'QA', Nationality: 'Qatari' },
  { NationalityID: 131, CountryCode: 'RO', Nationality: 'Romanian' },
  { NationalityID: 132, CountryCode: 'RW', Nationality: 'Rwandan' },
  { NationalityID: 13, CountryCode: 'SV', Nationality: 'Salvadorean' },
  { NationalityID: 37, CountryCode: 'AS', Nationality: 'Samoan' },
  { NationalityID: 133, CountryCode: 'SA', Nationality: 'Saudi Arabian' },
  { NationalityID: 134, CountryCode: 'SN', Nationality: 'Senegalese' },
  { NationalityID: 135, CountryCode: 'RS', Nationality: 'Serbian' },
  { NationalityID: 136, CountryCode: 'SL', Nationality: 'Sierra Leonian' },
  { NationalityID: 137, CountryCode: 'SG', Nationality: 'Singaporean' },
  { NationalityID: 138, CountryCode: 'SK', Nationality: 'Slovak' },
  { NationalityID: 139, CountryCode: 'SI', Nationality: 'Slovenian' },
  { NationalityID: 140, CountryCode: 'SB', Nationality: 'Slomoni' },
  { NationalityID: 141, CountryCode: 'SO', Nationality: 'Somali' },
  { NationalityID: 142, CountryCode: 'ZA', Nationality: 'South African' },
  { NationalityID: 24, CountryCode: 'KR', Nationality: 'South Korean' },
  { NationalityID: 28, CountryCode: 'ES', Nationality: 'Spanish' },
  { NationalityID: 29, CountryCode: 'SE', Nationality: 'Swedish' },
  { NationalityID: 30, CountryCode: 'CH', Nationality: 'Swiss' },
  { NationalityID: 143, CountryCode: 'LK', Nationality: 'Sri Lankan' },
  { NationalityID: 144, CountryCode: 'SD', Nationality: 'Sudanese' },
  { NationalityID: 145, CountryCode: 'SR', Nationality: 'Surinamese' },
  { NationalityID: 146, CountryCode: 'SZ', Nationality: 'Swazi' },
  { NationalityID: 31, CountryCode: 'TW', Nationality: 'Taiwanese' },
  { NationalityID: 147, CountryCode: 'TJ', Nationality: 'Tajik' },
  { NationalityID: 148, CountryCode: 'TH', Nationality: 'Thai' },
  { NationalityID: 149, CountryCode: 'TG', Nationality: 'Togolese' },
  { NationalityID: 150, CountryCode: 'TT', Nationality: 'Trinidadian' },
  { NationalityID: 151, CountryCode: 'TN', Nationality: 'Tunisian' },
  { NationalityID: 152, CountryCode: 'TR', Nationality: 'Turkish' },
  { NationalityID: 153, CountryCode: 'TM', Nationality: 'Turkoman' },
  { NationalityID: 154, CountryCode: 'TV', Nationality: 'Tuvaluan' },
  { NationalityID: 155, CountryCode: 'UG', Nationality: 'Ugandan' },
  { NationalityID: 156, CountryCode: 'UA', Nationality: 'Ukrainian' },
  { NationalityID: 157, CountryCode: 'AE', Nationality: 'Emirati' },
  { NationalityID: 32, CountryCode: 'VE', Nationality: 'Venezuelan' },
  { NationalityID: 33, CountryCode: 'VN', Nationality: 'Vietnamese' },
  { NationalityID: 159, CountryCode: 'UY', Nationality: 'Uruguayan' },
  { NationalityID: 160, CountryCode: 'UZ', Nationality: 'Uzbek' },
  { NationalityID: 161, CountryCode: 'VU', Nationality: 'Vanuatuan' },
  { NationalityID: 162, CountryCode: 'YE', Nationality: 'Yemeni' },
  { NationalityID: 163, CountryCode: 'ZM', Nationality: 'Zambian' }
  ];

  ngOnInit(): void {
    this.user = this.data.currentUser;
    this.url = this.user?.blob;
    this.displayValues();
  }

  /**
   * It displays the values of the user object in the HTML.
   * </code>
   */
  displayValues() {
    this.FNDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.firstName;
    this.SNDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.secondName;
    this.FSDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.firstSurname;
    this.SSDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.secondSurname;
    this.BDDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.birthDate;
    this.NDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.nationality;
    this.LDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user?.level;
  }

  /**
   * It gets the base64 string from the file input and then assign it to a variable in my
   * component.
   * 
   * @param {any} event - any - the event that is triggered when the user selects a file
   */
  async onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {

        this.url = reader.result?.toString();
        this.blob = this.url.split(",", 2);

        if (this.user) {
          this.user.profilePicture = this.blob[1];
          this.user.blob = this.sanitizer.bypassSecurityTrustUrl(this.url);
          this.save("profilePicture", this.profileForm);
        }

      }
      await new Promise(f => (setTimeout(f, 100)));
    }
  }

  /**
   * It takes a string as a parameter and depending on the string, it hides the display element and
   * shows the input element.
   * @param {any} set - any
   */
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

  /**
   * It takes a string as a parameter and depending on the value of the string, it hides the input,
   * save and close buttons and shows the display and edit buttons.
   * @param {any} set - any
   */
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

  /**
   * It takes two parameters, one is a string that indicates which form is being submitted, and the
   * other is the form itself.
   * 
   * The function then checks if the user is logged in, and if so, it checks which form is being
   * submitted, and then it updates the user object with the new data, and then it updates the display
   * with the new data.
   * 
   * After that, it sends the updated user object to the server, and then it calls the cancel function,
   * which closes the form.
   * 
   * @param {any} set - string
   * @param {any} form - any = {};
   */
  save(set: any, form: any) {
    if (this.user) {
      switch (set) {
        case "firstName":
          this.user.firstName = form.firstName;
          this.FNDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.firstName;
          //console.log(this.FNInput.nativeElement.innerHTML);
          break;
        case "secondName":
          this.user.secondName = form.secondName;
          this.SNDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.secondName;
          break;
        case "firstSurname":
          this.user.firstSurname = form.firstSurname;
          this.FSDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.firstSurname;
          break;
        case "secondSurname":
          this.user.secondSurname = form.secondSurname;
          this.SSDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.secondSurname;
          break;
        case "birthDate":
          this.user.birthDate = form.birthDate;
          this.BDDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.birthDate;
          break;
        case "nationality":
          this.user.nationality = form.nationality;
          this.NDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.nationality;
          break;
        case "level":
          this.user.level = form.level;
          this.LDisplay.nativeElement.getElementsByTagName('strong')[0].innerHTML = this.user.level;
          break;
      }
      this.data.currentUser = this.user;
      this.api.changeCredentials(this.user).subscribe(data => {
        console.log(data);
      })
      this.cancel(set);
    }
  }

}
