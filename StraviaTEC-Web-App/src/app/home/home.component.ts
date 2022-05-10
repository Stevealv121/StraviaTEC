import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  routeMap: string = "assets/images/route-map.png";
  friendsActivity: number[] = [1, 2, 3];

  ngOnInit(): void {
  }

}
