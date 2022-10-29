import { TestBed } from '@angular/core/testing';

import { WaypointsService } from './waypoints.service';

describe('WaypointsService', () => {
  let service: WaypointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaypointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
