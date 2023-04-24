import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointManagerComponent } from './waypoint-manager.component';

describe('WaypointManagerComponent', () => {
  let component: WaypointManagerComponent;
  let fixture: ComponentFixture<WaypointManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaypointManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
