import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelseachComponent } from './hotelseach.component';

describe('HotelseachComponent', () => {
  let component: HotelseachComponent;
  let fixture: ComponentFixture<HotelseachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelseachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelseachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
