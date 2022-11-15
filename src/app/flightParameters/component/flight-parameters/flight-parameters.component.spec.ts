import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightParametersComponent } from './flight-parameters.component';

describe('FlightParametersComponent', () => {
  let component: FlightParametersComponent;
  let fixture: ComponentFixture<FlightParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
