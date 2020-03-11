import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteldComponent } from './hoteld.component';

describe('HoteldComponent', () => {
  let component: HoteldComponent;
  let fixture: ComponentFixture<HoteldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoteldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
