import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr'
import { read } from 'fs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  url: any = '';
  test: string = "assets/images/avatar.png";

  constructor(private api: ApiService, private toastr: ToastrService) { }

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

  fileToUpload: File | null = null;

  ngOnInit(): void {
    // this.url = '../../assets/images/avatar.png';
  }

  postForm(form: UserI) {
    this.api.signUp(form).subscribe(data => {
      console.log(data);
    });
    this.success();
  }

  success() {
    this.toastr.success("New account succesfully created!", "Success")
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      // reader.onload = (event) => { // called once readAsDataURL is completed
      //   this.url = event.target?.result;
      // };
      reader.onload = () => {
        this.url = reader.result?.toString();
        console.log(this.url);
        this.registerForm.patchValue({
          profilePicture: this.url
        });
        //callback(reader.result);  reader.result as string
      }

      reader.readAsDataURL(event.target.files[0]);
      //this.url = reader.readAsText(event.target.files[0]);
      //console.log(reader.result)
      console.log(this.url);
      console.log(this.registerForm);
    }


  }



  setProfilePicture(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

}
