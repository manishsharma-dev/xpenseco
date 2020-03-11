import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaydComponent } from './holidayd.component';

describe('HolidaydComponent', () => {
  let component: HolidaydComponent;
  let fixture: ComponentFixture<HolidaydComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaydComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaydComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
