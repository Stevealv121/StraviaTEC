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

  @ViewChild('closePS') modalClosePassword!: ElementRef;

  ngOnInit(): void {
  }

  changePassword(form: any) {

    if (this.data.currentUser) {
      this.data.currentUser.password = form.password;

      this.api.changeCrediantials(this.data.currentUser).subscribe(data => {
        console.log(data);
      })
    }
    //console.log(this.data.currentUser);
    console.log(form.password);
    this.toastr.success("New password succesfully changed!", "Success");
    this.modalClosePassword.nativeElement.click();

  }
}
