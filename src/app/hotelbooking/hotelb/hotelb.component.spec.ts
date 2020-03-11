import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelbComponent } from './hotelb.component';

describe('HotelbComponent', () => {
  let component: HotelbComponent;
  let fixture: ComponentFixture<HotelbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
