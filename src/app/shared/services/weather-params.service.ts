import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Weather} from "../../weater/model/indexWeater";
import {ToastrService} from "ngx-toastr";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class WeatherParamsService {

  private weatherParams = new BehaviorSubject<Weather>({windSpeed: 0, directionOfWind: 180, city: "", source: "OWN"})
  selectWeatherParams = this.weatherParams.asObservable();

  constructor(private readonly notification: ToastrService,
              private readonly transloco: TranslocoService) {
  }

  setWeatherParams(weatherParams: Weather) {
    if (weatherParams) {
      this.notification.success(this.transloco.translate(
        'weatherParameters.params', {...weatherParams}
      ), this.transloco.translate(
        'weatherParameters.success'
      ),);
      this.weatherParams.next(weatherParams)
    } else {
      this.notification.error(this.transloco.translate(
        'weatherParameters.error'
      ),);
    }

  }
}
