import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrSummaryTableComponent } from './vfr-summary-table.component';

describe('VfrSummaryTableComponent', () => {
  let component: VfrSummaryTableComponent;
  let fixture: ComponentFixture<VfrSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VfrSummaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VfrSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
