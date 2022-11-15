import { TestBed } from '@angular/core/testing';

import { FlightParamsService } from './flight-params.service';

describe('FlightParamsService', () => {
  let service: FlightParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
