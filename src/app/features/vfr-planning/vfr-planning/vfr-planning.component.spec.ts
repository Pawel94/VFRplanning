import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrPlanningComponent } from './vfr-planning.component';

describe('VfrPlanningComponent', () => {
  let component: VfrPlanningComponent;
  let fixture: ComponentFixture<VfrPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VfrPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VfrPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
