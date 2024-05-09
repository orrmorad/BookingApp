import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/models';

const reviewssUrl = 'http://localhost:3000/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  addReview(hotelId: string, review: Review) {
    this.http.post(`${reviewssUrl}/addReview`, {})
  }
}
