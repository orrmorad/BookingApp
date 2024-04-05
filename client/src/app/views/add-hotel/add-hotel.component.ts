import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/models';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {

  constructor(private fb: FormBuilder, private hotelService: HotelsService) { }

  addHotelForm: FormGroup = new FormGroup({});
  isShowRoomPriceForm: boolean = false;

  ngOnInit(): void {
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

  roomPriceFormVisibility(isVisible: boolean) {
    this.isShowRoomPriceForm = isVisible;
  }

  createHotel() {

  }

}
