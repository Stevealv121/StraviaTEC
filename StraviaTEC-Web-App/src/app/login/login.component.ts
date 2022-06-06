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

  /**
   * The function is called when the user clicks the login button. It takes the user's username and
   * password and sends it to the API. If the API returns a null value, it means the user's credentials
   * are wrong. If the API returns a value, it means the user's credentials are correct.
   * @param {LoginI} form - LoginI
   */
  onLogin(form: LoginI) {
    let password = form.password;
    let userName = form.userName;
    //let credentials = false;
    this.api.login(userName, password).subscribe(data => {
      if (data == null) {
        alert("Wrong credentials, please access with a valid email and password.");
      } else {
        this.data.currentUser = data;
        if (data.profilePicture == null) {
          this.data.currentUser.blob = "assets/images/avatar.png";
        } else {
          let objectURL = 'data:image/jpeg;base64,' + data.profilePicture;
          this.data.currentUser.blob = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        console.log(this.data.currentUser);
        //credentials = true;
        // alert("Login...");
        this.toastr.success("Login completed!", "Success");
        this.router.navigateByUrl("home");
      }
    })

  }
}
