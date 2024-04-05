import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  credentials = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(guest: boolean = false) {
    if (guest) {
      this.authService.loginGuest()
      this.router.navigateByUrl('home');
    }
    else
      this.authService.login(this.credentials.username, this.credentials.password)?.subscribe((res:any) => {
        if (!res) {
          console.log('User no exists');
          return;
        }
        this.router.navigateByUrl('home');
      });
  }

  createAccount() {
    this.router.navigateByUrl('signup');
  }

}
