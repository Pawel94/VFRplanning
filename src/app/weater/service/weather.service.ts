import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Weather} from "../model/indexWeater";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly httpRequest: HttpClient) {
  }

  IMGW_LINK = " https://danepubliczne.imgw.pl/api/data/synop/station/"
  OPEN_METEO = "https://api.open-meteo.com/v1/forecast?latitude=52.17&longitude=16.4410&current_weather=true&windspeed_unit=ms"

  getWeatherDataFromIMGW(city: string): Observable<Weather> {

    return this.httpRequest.get(this.IMGW_LINK + city)
      .pipe(map((response: any) =>
        ({
          windSpeed: response.predkosc_wiatru,
          directionOfWind: response.kierunek_wiatru,
          city: response.stacja,
          source: "IMGW Poland"
        } as Weather)))
  }

  getWeatherDataFromOPEN_METEO(): Observable<any> {

    return this.httpRequest.get(this.OPEN_METEO)
      .pipe(map((response: any) =>
      ({
        windSpeed: response.current_weather.windspeed,
        directionOfWind: response.current_weather.winddirection,
        city: response.current_weather.latitude + " " + response.current_weather.latitude,
        source: "OPEN_METEO"
      } as Weather)))

  }
}
