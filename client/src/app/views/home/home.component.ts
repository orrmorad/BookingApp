import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hotels$?: Observable<any>;
  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.hotels$ = this.hotelsService.hotels$;
  }  

  deleteHotel(hotel: any) {
    this.hotelsService.removeHotel(hotel._id).subscribe();
  }

}
