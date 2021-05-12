import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TitleCasePipe } from "@angular/common";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl='http://localhost:5000/api/auth/';
  baseUrl = environment.apiUrl + 'auth/'; //set url from environment/environment.ts
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  // photoUrl = new BehaviorSubject<string>('../../assets/person-icon.png');
  photoUrl = new BehaviorSubject<string>('./assets/person-icon.png'); //for build to sub-directory
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private http:HttpClient, 
    private alertService: AlertifyService,
    private titleCasePipe: TitleCasePipe,
    private router: Router
    ) { }

  login(model: any) {
    return this.http.post(this.baseUrl+'login',model).pipe(
      map((response:any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.refreshToken();
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
          console.log(this.decodedToken); //console
        }
      })
    );
  }

  refreshToken() {
    const token = localStorage.getItem('token');
    if(token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  // register(model: any) {
  //   return this.http.post(this.baseUrl+'register',model);
  // }
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // return !!token;
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.alertService.message('Logged out');
    this.router.navigate(['/home']);
  }

  changeMemberPhoto(imgUlr: string) {
    this.photoUrl.next(imgUlr);
  }
}
