import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayrComponent } from './holidayr.component';

describe('HolidayrComponent', () => {
  let component: HolidayrComponent;
  let fixture: ComponentFixture<HolidayrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
