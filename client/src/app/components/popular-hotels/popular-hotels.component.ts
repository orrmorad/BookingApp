import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-popular-hotels',
  templateUrl: './popular-hotels.component.html',
  styleUrls: ['./popular-hotels.component.scss']
})
export class PopularHotelsComponent implements OnInit {

  hotels$?: Observable<any>;
  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.hotels$ = this.hotelsService.hotels$;
  }

}
