import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginI } from '../models/login.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService, private router: Router,
    private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  onLogin(form: LoginI) {
    let password = form.password;
    let userName = form.userName;
    //let credentials = false;
    this.api.login(userName, password).subscribe(data => {
      if (data == null) {
        alert("Wrong credentials, please access with a valid email and password.");
      } else {
        this.data.currentUser = data;
        let objectURL = 'data:image/jpeg;base64,' + data.profilePicture;
        this.data.currentUser.blob = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(this.data.currentUser);
        //credentials = true;
        // alert("Login...");
        this.toastr.success("Login completed!", "Success");
        this.router.navigateByUrl("home");
      }
    })

  }
}
