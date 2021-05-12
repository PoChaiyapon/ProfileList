import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in Successfully');
    }, error => {
      this.alertify.error(error);
    },() => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    const token = this.authService.loggedIn();
    return !!token;
  }
}
