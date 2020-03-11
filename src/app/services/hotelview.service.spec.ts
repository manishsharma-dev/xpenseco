import { TestBed } from '@angular/core/testing';

import { HotelviewService } from './hotelview.service';

describe('HotelviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelviewService = TestBed.get(HotelviewService);
    expect(service).toBeTruthy();
  });
});
