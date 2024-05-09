import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgePrices, Hotel, RoomPrice } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private hotelService: HotelsService, private authService: AuthService, private router:Router) { }  

  addHotelForm: FormGroup = new FormGroup({});
  isShowRoomPriceForm: boolean = false;
  newHotel: Hotel = new Hotel();
  regularRoomPrice: AgePrices = new AgePrices();
  bigRoomPrice: AgePrices = new AgePrices();
  suiteRoomPrice: AgePrices = new AgePrices();
  userSub:Subscription = new Subscription();
  userId = '';

  ngOnInit(): void {
    this.userSub = this.authService.loggedUser.subscribe(user => this.userId = user?.id || '');
    this.addHotelForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, Validators.required],
      location: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
      }),
      rooms: this.fb.group({
        regularAdult: [0, Validators.required],
        regularChild: [0, Validators.required],
        bigAdult: [0, Validators.required],
        bigChild: [0, Validators.required],
        suiteAdult: [0, Validators.required],
        suiteChild: [0, Validators.required],
      })
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  roomPriceFormVisibility(isVisible: boolean) {
    this.isShowRoomPriceForm = isVisible;
  }

  createHotel() {
    this.newHotel.roomPrice = new RoomPrice(this.regularRoomPrice, this.bigRoomPrice, this.suiteRoomPrice);
    this.newHotel.userCreatedId = this.userId;
    this.newHotel.location.generateTitle();
    this.hotelService.createHotel(this.newHotel).subscribe(res =>{
      this.router.navigateByUrl('/home');
    });
  }
}
