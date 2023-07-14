import { TestBed } from '@angular/core/testing';

import { WeatherParamsService } from './weather-params.service';

describe('WeatherParamsService', () => {
  let service: WeatherParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
