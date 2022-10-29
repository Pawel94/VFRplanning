import { TestBed } from '@angular/core/testing';

import { RouteService } from './route.service';

describe('WaypointsService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
