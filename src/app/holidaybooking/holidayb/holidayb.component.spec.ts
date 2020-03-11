import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaybComponent } from './holidayb.component';

describe('HolidaybComponent', () => {
  let component: HolidaybComponent;
  let fixture: ComponentFixture<HolidaybComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaybComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaybComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
