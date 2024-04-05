import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const usersUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
   }

  private getItems = new BehaviorSubject<void>(undefined);

  users$ = this.getItems.asObservable().pipe(
    switchMap(() => this.getAllUsers()),
    map(response => response)
  )

  getAllUsers(): Observable<User[]> {
    return this.http.get(`${usersUrl}/getAllUsers`).pipe(
      map(response => <User[]>response),
      shareReplay(),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    )
  }

  getUserById(id: string) {
    return this.http.get(`${usersUrl}/getUser/${id}`).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  createUser(user: User) {
    return this.http.post(`${usersUrl}/addUser`, user).pipe(map(() => {
      this.getItems.next();
    }), catchError((err: any) => {
      console.error(err);
      return err;
    }));
  }
}
