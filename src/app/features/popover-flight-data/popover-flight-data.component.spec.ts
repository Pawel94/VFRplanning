import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverFlightDataComponent } from './popover-flight-data.component';

describe('PopoverFlightDataComponent', () => {
  let component: PopoverFlightDataComponent;
  let fixture: ComponentFixture<PopoverFlightDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PopoverFlightDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverFlightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
