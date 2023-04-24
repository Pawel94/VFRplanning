import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrSummaryManagerComponent } from './vfr-summary-manager.component';

describe('SummaryPageManagerComponent', () => {
  let component: VfrSummaryManagerComponent;
  let fixture: ComponentFixture<VfrSummaryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VfrSummaryManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VfrSummaryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
