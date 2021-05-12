import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  photoUrl: string;

  // constructor(private authService: AuthService) { }
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(imgUrl => this.photoUrl = imgUrl);

  }

  loggedIn() {
    const token = this.authService.loggedIn();
    return !!token;
  }

  logOut() {
    this.authService.logOut();
  }
}
