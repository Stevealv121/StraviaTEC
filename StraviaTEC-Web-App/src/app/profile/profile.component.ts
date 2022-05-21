import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  url: string = 'assets/images/avatar.png';

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {

        this.url = reader.result as string;

        // this.registerForm.patchValue({
        //   profilePicture: reader.result
        // });

      };
    }
  }

}
