import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyledgerComponent } from './myledger.component';

describe('MyledgerComponent', () => {
  let component: MyledgerComponent;
  let fixture: ComponentFixture<MyledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
