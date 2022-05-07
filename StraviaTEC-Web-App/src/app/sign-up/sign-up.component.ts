import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  url: string | ArrayBuffer | null | undefined = '';
  test: string = "assets/images/avatar.png";

  constructor(private api: ApiService) { }

  registerForm = new FormGroup({
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
  levelOptions: string[] = ["Beginner", "Intermediate", "Elite"];

  ngOnInit(): void {
    // this.url = '../../assets/images/avatar.png';

  }

  postForm(form: UserI) {
    this.api.signUp(form).subscribe(data => {
      console.log(data);
    });
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   this.url = event.target?.result;
      // }
      reader.onload = () => {

        this.url = reader.result as string;

        this.registerForm.patchValue({
          profilePicture: reader.result
        });

      };
    }
  }

}
