import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalBookingComponent } from './international-booking.component';

describe('InternationalBookingComponent', () => {
  let component: InternationalBookingComponent;
  let fixture: ComponentFixture<InternationalBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
