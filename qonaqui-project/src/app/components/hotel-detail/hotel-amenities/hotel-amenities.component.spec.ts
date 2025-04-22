import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAmenitiesComponent } from './hotel-amenities.component';

describe('HotelAmenitiesComponent', () => {
  let component: HotelAmenitiesComponent;
  let fixture: ComponentFixture<HotelAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAmenitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
