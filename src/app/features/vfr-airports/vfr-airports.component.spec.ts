import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrAirportsComponent } from './vfr-airports.component';

describe('VfrAirportsComponent', () => {
  let component: VfrAirportsComponent;
  let fixture: ComponentFixture<VfrAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VfrAirportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VfrAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
