import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { Hotel } from '../models/models';

const hotelsUrl = 'http://localhost:3000/hotels'

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }

  private getItems = new BehaviorSubject<void>(undefined);

  hotels$ = this.getItems.asObservable().pipe(
    switchMap(() => this.getAllHotels()),
    map(response => response),
    shareReplay()
  );

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get(`${hotelsUrl}/getAllHotels`).pipe(map(res => res as Hotel[]));
  }

  createHotel(hotel: Hotel) {
    return this.http.post(`${hotelsUrl}/addHotel`, hotel).pipe(map(hotels => {
      this.getItems.next();
    }), catchError((err: any) => {
      console.error(err)
      return err;
    }));
  }

  removeHotel(id: string) {
    return this.http.delete(`${hotelsUrl}/removeHotel/${id}`).pipe(map(() => {
      this.getItems.next();
    }), catchError((err: any) => {
      console.error(err)
      return err;
    }))
  }

}
