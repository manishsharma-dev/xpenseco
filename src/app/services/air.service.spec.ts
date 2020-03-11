import { TestBed } from '@angular/core/testing';

import { AirService } from './air.service';

describe('AirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirService = TestBed.get(AirService);
    expect(service).toBeTruthy();
  });
});
