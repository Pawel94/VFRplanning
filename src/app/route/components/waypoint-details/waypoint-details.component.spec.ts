import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointDetailsComponent } from './waypoint-details.component';

describe('WaypointDetailsComponent', () => {
  let component: WaypointDetailsComponent;
  let fixture: ComponentFixture<WaypointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaypointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
