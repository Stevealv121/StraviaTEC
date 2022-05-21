import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-athlete-search',
  templateUrl: './athlete-search.component.html',
  styleUrls: ['./athlete-search.component.css']
})
export class AthleteSearchComponent implements OnInit {

  constructor() { }

  athletes: number[] = [1, 2, 3, 4, 5];

  ngOnInit(): void {
  }

}
