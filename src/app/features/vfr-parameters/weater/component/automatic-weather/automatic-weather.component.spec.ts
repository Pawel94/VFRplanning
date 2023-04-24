import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticWeatherComponent } from './automatic-weather.component';

describe('AutomaticWeatherComponent', () => {
  let component: AutomaticWeatherComponent;
  let fixture: ComponentFixture<AutomaticWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AutomaticWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
