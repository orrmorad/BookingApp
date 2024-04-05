import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/models';
import { UsersService } from 'src/app/services/users.service';
import { SignupDialogComponent } from 'src/app/components/signup-dialog/signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = '';



  constructor(private fb: FormBuilder, private userService: UsersService, private authService: AuthService, public dialog: MatDialog, private router: Router) {
    // this.user = {
    //   email: "orrmorad23@gmail.com",
    //   firstname: "Orr",
    //   id: "200955805",
    //   isAdmin: false,
    //   lastname: "Morad",
    //   password: "11",
    //   reservations: []
    // }
  }

  signupForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      id: [this.user.id, Validators.required],
      username: [this.user.username, Validators.required],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
      confirmPassword: [this.confirmPassword, Validators.required]
    })
  }

  createAccount() {
    this.userService.createUser(this.user).subscribe(res => {
      this.openDialog();
    });
  }

  clearForm() {
    this.user = new User();
    this.confirmPassword = '';
  }

  backToLogin(){
    this.router.navigateByUrl('login');
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '250px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.authService.login(result.username, result.password);
        this.router.navigateByUrl('home');
      }
      else {
        this.router.navigateByUrl('login');
      }
    });
  }

  passChange(){
    console.log(this.user);
    console.log(this.confirmPassword)
  }

}
