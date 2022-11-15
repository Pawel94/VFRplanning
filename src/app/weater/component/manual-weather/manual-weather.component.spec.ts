import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualWeatherComponent } from './manual-weather.component';

describe('ManualWeatherComponent', () => {
  let component: ManualWeatherComponent;
  let fixture: ComponentFixture<ManualWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
