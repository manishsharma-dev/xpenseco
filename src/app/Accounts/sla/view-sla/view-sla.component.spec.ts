import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSLAComponent } from './view-sla.component';

describe('ViewSLAComponent', () => {
  let component: ViewSLAComponent;
  let fixture: ComponentFixture<ViewSLAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSLAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSLAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
