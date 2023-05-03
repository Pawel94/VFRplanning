import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrSummaryPanelComponent } from './vfr-summary-panel.component';

describe('VfrSummaryPanelComponent', () => {
  let component: VfrSummaryPanelComponent;
  let fixture: ComponentFixture<VfrSummaryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VfrSummaryPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VfrSummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
