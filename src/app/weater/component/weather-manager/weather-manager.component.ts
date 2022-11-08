import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {Weather} from "../../model/indexWeater";

@Component({
  selector: 'vfr-weater-manager',
  templateUrl: './weather-manager.component.html',
  styleUrls: ['./weather-manager.component.scss']
})
export class WeatherManagerComponent implements OnInit {
  @Input() fromParent!: string[];

  constructor(private readonly weatherService: WeatherService) {
  }

  actualWeatherIMGW$?: Observable<Weather>
  actualWeatherIMGW$2?: Observable<Weather>
  searchedOptions?: any["Poznan"];
  actualWeather$?: Observable<Weather[]>

  ngOnInit(): void {
    // this.weatherService.getWeatherDataFromOPEN_METEO().subscribe(x => console.log(x));
  //
  }

  getActualWeather() {
    this.actualWeatherIMGW$ = this.weatherService.getWeatherDataFromIMGW("poznan")
    this.actualWeatherIMGW$2 = this.weatherService.getWeatherDataFromOPEN_METEO()
    this.actualWeather$ = combineLatest(this.actualWeatherIMGW$, this.actualWeatherIMGW$2).pipe(
      map(([a, b]) => [a, b])
    );
  }

  getCityName: OperatorFunction<string, readonly string[]> = (text$: Observable<string | undefined>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === '' ? [] : this.fromParent.filter((v) => v.toLowerCase().indexOf(term!.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  model: any;

}
