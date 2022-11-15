import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Weather} from "../../weater/model/indexWeater";

@Injectable({
  providedIn: 'root'
})
export class WeatherParamsService {

  private weatherParams = new BehaviorSubject<Weather>({windSpeed: 0, directionOfWind: 180, city: "", source: "OWN"})
  selectWeatherParams = this.weatherParams.asObservable();

  constructor() {
  }

  setWeatherParams(weatherParams: Weather) {
    this.weatherParams.next(weatherParams)
  }
}
