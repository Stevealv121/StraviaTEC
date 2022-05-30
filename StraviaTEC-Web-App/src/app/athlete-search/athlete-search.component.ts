import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserI } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-athlete-search',
  templateUrl: './athlete-search.component.html',
  styleUrls: ['./athlete-search.component.css']
})
export class AthleteSearchComponent implements OnInit {

  constructor(private api: ApiService, private data: DataService) { }

  athletes: UserI[] = [];

  searchForm = new FormGroup({
    firstName: new FormControl('')
  })

  ngOnInit(): void {
    this.getUsers();
  }

  searchAthlete(form: any) {
    this.athletes = [];
    this.api.searchUser(form.firstName).subscribe(data => {
      console.log(data);
      this.athletes = data;
    })

  }

  getUsers() {
    this.api.getAllUsers().subscribe(data => {
      this.athletes = data;
    })
  }

}
