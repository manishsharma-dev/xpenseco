import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeentRegistrationComponent } from './ageent-registration.component';

describe('AgeentRegistrationComponent', () => {
  let component: AgeentRegistrationComponent;
  let fixture: ComponentFixture<AgeentRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeentRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
