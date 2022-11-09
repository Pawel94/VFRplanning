import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {debounceTime, distinctUntilChanged, map, Observable} from "rxjs";
import {Weather} from "../../model/indexWeater";
import {CommonService} from "../../../common/services/common.service";
import {Airport} from "../../../map/model/modelForMaps";

@Component({
  selector: 'vfr-weater-manager',
  templateUrl: './weather-manager.component.html',
  styleUrls: ['./weather-manager.component.scss']
})
export class WeatherManagerComponent implements OnInit {
  @Input() fromParent!: Airport[];
  private acceptedAirport?: Airport;

  constructor(private readonly weatherService: WeatherService, private readonly common: CommonService) {
  }

  actualWeatherIMGW$?: Observable<Weather>
  actualWeaterOpenMeteo?: Observable<Weather>
  actualWeather$?: Observable<Weather[]>

  ngOnInit(): void {
    this.common.getCitiesFromDB().subscribe(x => console.log(x))
  }

  getActualWeather() {
    this.actualWeatherIMGW$ = this.weatherService.getWeatherDataFromIMGW(this.acceptedAirport?.city)
    this.actualWeaterOpenMeteo = this.weatherService.getWeatherDataFromOPEN_METEO(this.acceptedAirport?.lat, this.acceptedAirport?.lng)
    this.actualWeather$ = this.actualWeaterOpenMeteo.pipe(
      map(place => {
        place.city = this.acceptedAirport?.city ?? ""
        return [place]
      }))
  }

  getCityName: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      // takeUntil(this.unsubscribeSignal.asObservable()),
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.fromParent.filter((v) => v.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
      map(x => x.map(x => {
          this.acceptedAirport = x;
          return x.city
        }
      )),
    );

  model: any;

}
