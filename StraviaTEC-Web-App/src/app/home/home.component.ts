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
  friendImage: string = "assets/images/avatar.png";
  isVisible: boolean = false;
  topComments: number[] = [1, 2];
  hasComments: boolean = false;
  comments: number[] = [1, 2, 3, 4];

  ngOnInit(): void {
    this.checkIfHasComments();
  }

  showComments() {
    this.isVisible = true;
  }
  showLessComments() {
    this.isVisible = false;
  }

  checkIfHasComments() {
    !this.topComments.length ? this.hasComments = false : this.hasComments = true;
  }
}
