import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularHotelsComponent } from './popular-hotels.component';

describe('PopularHotelsComponent', () => {
  let component: PopularHotelsComponent;
  let fixture: ComponentFixture<PopularHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
