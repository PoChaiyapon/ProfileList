import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from "src/app/_models/user";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editForm.dirty){
      return $event.returnValue = true;
    }
  }
  photoUrl: string;

  constructor(
    private route: ActivatedRoute, 
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.authService.currentPhotoUrl.subscribe(imgUrl => this.photoUrl = imgUrl);
  }

  updateUser() {
    // console.log(this.user);
    // this.alertify.success('Profile updated successfully');
    // this.editForm.reset(this.user);
    
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
