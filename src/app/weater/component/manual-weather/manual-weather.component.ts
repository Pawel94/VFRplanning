import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Weather} from "../../model/indexWeater";

@Component({
  selector: 'vfr-manual-weather',
  templateUrl: './manual-weather.component.html',
  styleUrls: ['./manual-weather.component.scss']
})
export class ManualWeatherComponent implements OnInit {
  @Output() dataFromManualForm = new EventEmitter<Weather>();

  manualWeatherForm: FormGroup = new FormGroup<any>({
    windSpeed: new FormControl<number | null>(0, {}),
    directionOfWind: new FormControl<number | null>(100, {}),
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  addManualWeather() {
    const weather = this.buildWeatherObject(this.manualWeatherForm.value);
    this.dataFromManualForm.emit(weather)
  }

  private buildWeatherObject(formValues:any):Weather{
    let weather = {} as Weather
    weather = this.manualWeatherForm.value;
    weather.source = "Manual Conditions"
    weather.city = "-"
    return weather
  }
}
