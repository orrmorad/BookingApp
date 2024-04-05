import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bookingApp';

  constructor(private authService: AuthService) { }
  
  currentUser = this.authService.loggedUser;

  ngOnInit(): void {
    this.authService.isUserInCache()?.subscribe();
  }

  ngOnDestroy(): void {
  }

}
