import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginI } from '../models/login.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  onLogin(form: LoginI) {
    let password = form.password;
    let userName = form.userName;
    let credentials = false;
    this.api.login(userName, password).subscribe(data => {
      if (data == null) {
        alert("Wrong credentials, please access with a valid email and password.");
      } else {
        this.data.currentUser = data;
        console.log(this.data.currentUser);
        credentials = true;
        alert("Login...");
      }
    })

  }
}
