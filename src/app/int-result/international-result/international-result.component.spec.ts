import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalResultComponent } from './international-result.component';

describe('InternationalResultComponent', () => {
  let component: InternationalResultComponent;
  let fixture: ComponentFixture<InternationalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
