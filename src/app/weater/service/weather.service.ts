import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Weather} from "../model/indexWeater";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly httpRequest: HttpClient) {
  }

  IMGW_LINK = " https://danepubliczne.imgw.pl/api/data/synop/station/"
  OPEN_METEO = "https://api.open-meteo.com/v1/forecast?latitude=52.17&longitude=16.4410&current_weather=true&windspeed_unit=ms"

  getWeatherDataFromIMGW(city: string | undefined): Observable<Weather> {

    return this.httpRequest.get(this.IMGW_LINK + city)
      .pipe(map((response: any) =>
          ({
            windSpeed: response.predkosc_wiatru,
            directionOfWind: response.kierunek_wiatru,
            city: response.stacja,
            source: "IMGW Poland"
          } as Weather)),
        catchError(val => of({city: val} as Weather)))
  }

  getWeatherDataFromOPEN_METEO(lat: number , lng: number ): Observable<Weather> {

    return this.httpRequest.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&windspeed_unit=ms`)
      .pipe(map((response: any) =>
        ({
          windSpeed: response.current_weather.windspeed,
          directionOfWind: response.current_weather.winddirection,
          city: "",
          source: "OPEN_METEO"
        } as Weather)))

  }

}
