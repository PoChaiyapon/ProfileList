import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup; //Reactive Forms
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    //validation
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required), //new FormControl('Hello', Validators.required),
    //   password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    //new
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: [''],
      dateOfBirth: ['', Validators.required],
      city: [null],
      country: [''],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null: {'mismatch': true};
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   // console.log('Registration successfully');
    //   this.alertify.success('Registration successfully');
    // }, error => {
    //   this.alertify.error(error);
    // });
    // console.log(this.registerForm);

    if(this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, ()=> {
        this.authService.login(this.user).subscribe(()=> {
          // this.router.navigate(['/members']); go to members
          //by po
          this.router.navigate(['/members/' + this.authService.decodedToken.nameid]);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
