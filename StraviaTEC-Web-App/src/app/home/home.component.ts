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
  viewComments: boolean = false;
  comments: number[] = [1, 2, 3, 4];

  ngOnInit(): void {
    this.checkIfHasComments();
  }

  showComments() {
    this.isVisible = true;
    this.viewComments = false;
  }
  showLessComments() {
    this.isVisible = false;
    this.viewComments = true;
  }

  checkIfHasComments() {
    !this.topComments.length ? this.hasComments = false : this.hasComments = true;
    this.hasComments ? this.viewComments = true : this.viewComments = false;
  }
}
