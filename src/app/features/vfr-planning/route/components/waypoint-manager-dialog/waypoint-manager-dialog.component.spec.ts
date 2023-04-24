import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointManagerDialogComponent } from './waypoint-manager-dialog.component';

describe('WaypointManagerComponent', () => {
  let component: WaypointManagerDialogComponent;
  let fixture: ComponentFixture<WaypointManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointManagerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaypointManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
