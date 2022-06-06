import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService, private toastr: ToastrService
    , private router: Router) { }

  passwordForm = new FormGroup({
    password: new FormControl('')
  })

  usernameForm = new FormGroup({
    username: new FormControl('')
  })

  @ViewChild('closePS') modalClosePassword!: ElementRef;
  @ViewChild('closeUN') modalCloseUsername!: ElementRef;
  @ViewChild('closeDA') modalCloseDeleteAcc!: ElementRef;

  usrname: string | null = "";
  firstname: string | null = "";
  lastname: string | null = "";

  profilePicture: any;

  ngOnInit(): void {
    if (this.data.currentUser) {
      this.usrname = this.data.currentUser.userName;
      this.firstname = this.data.currentUser.firstName;
      this.lastname = this.data.currentUser.firstSurname;
      this.profilePicture = this.data.currentUser.blob;
    }
  }

  /**
   * It changes the password of the current user, but I'm not sure how to do it.
   * @param {any} form - any -&gt; the form that is being submitted
   */
  changePassword(form: any) {

    if (this.data.currentUser) {
      this.data.currentUser.password = form.password;

      this.api.changeCredentials(this.data.currentUser).subscribe(data => {
        console.log(data);
      })
    }
    //console.log(this.data.currentUser);
    console.log(form.password);
    this.toastr.success("New password succesfully changed!", "Success");
    this.modalClosePassword.nativeElement.click();

  }

  /**
   * It changes the username of the current user, and then update the database with the new
   * username.
   * 
   * @param {any} form - any -&gt; the form that is being submitted
   */
  changeUsername(form: any) {

    if (this.data.currentUser) {
      console.log('Before: ' + this.data.currentUser.userName);
      this.data.currentUser.userName = form.username;
      this.usrname = form.username;
      console.log('After: ' + this.data.currentUser.userName);
      console.log('Form: ' + form.username);
      this.api.changeCredentials(this.data.currentUser).subscribe(data => {
        console.log(data);
      })
    }

    this.toastr.success("New username succesfully changed!", "Success");
    this.modalCloseUsername.nativeElement.click();

  }

  /**
   * It deletes the account of the currently logged in user
   */
  deleteAccount() {
    if (this.data.currentUser) {
      this.api.deleteAccount(this.data.currentUser.userName, this.data.currentUser.password).subscribe(data => {
        console.log(data);
      });
    }
    this.toastr.success("Account succesfully deleted!", "Success");
    this.modalCloseDeleteAcc.nativeElement.click();
    this.router.navigateByUrl("login");
  }
}
