import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Weather} from "@features/vfr-parameters";
import {NotificationService} from "../../services";

@Injectable({
  providedIn: 'root'
})
export class WeatherParamsService {

  private weatherParams = new BehaviorSubject<Weather>({windSpeed: 0, directionOfWind: 180, city: "", source: "OWN"})
  selectWeatherParams = this.weatherParams.asObservable();

  constructor(private readonly notification: NotificationService) {
  }

  setWeatherParams(weatherParams: Weather) {
    if (weatherParams) {
      this.notification.getSuccess('weatherParameters.params', weatherParams);
      this.weatherParams.next(weatherParams)
    } else {
      this.notification.getFailure('weatherParameters.error');
    }
  }
}
