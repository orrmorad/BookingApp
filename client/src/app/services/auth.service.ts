import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credentials = { username: '', password: '' };

  loggedUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  constructor(private userService: UsersService) {
  }

  isUserInCache() {
    const userId = localStorage.getItem('userId');
    if (userId === '0') {
      this.loggedUser.next(new User('0', 'Guest'));
      return of(true);
    }
    if (userId) {
      return this.userService.getAllUsers().pipe(
        map(users => {
          const found = users.find((user: User) => {
            return user.id === userId;
          })
          if (found) {
            this.loggedUser.next(found);
            return true;
          } else {
            this.loggedUser.next(undefined);
            return false;
          }
        })
      )
    }
    this.loggedUser.next(undefined);
    return of(false);
  }


  login(username: string = '', password: string = '') {
    this.credentials = { username, password };
    if (username === '' && password === '') {
      return;
    }
    return this.checkUser();
  }

  loginGuest() {
    let user = new User('0', 'Guest');
    if (user?.id)
      localStorage.setItem('userId', user.id)
    this.loggedUser.next(new User('0', 'Guest'));
  }

  logout() {
    localStorage.removeItem('userId');
    this.loggedUser.next(undefined);
  }

  checkUser(): Observable<User | undefined> {
    if (!(this.credentials.username && this.credentials.password)) return of(undefined);
    return this.userService.getAllUsers().pipe(
      map(users => {
        const found = users.find((user: User) => {
          return user.username === this.credentials.username && user.password === this.credentials.password
        })
        if (found === undefined) return undefined;
        this.loggedUser.next(found)
        if (found.id)
          localStorage.setItem('userId', found.id)
        return found;
      })
    )
  }
}