import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {map, Observable, Subject} from "rxjs";
import {Weather} from "../../model/indexWeater";
import {CommonService} from "../../../../../common/services/communication/firebase-communication/common.service";
import {Airport} from "../../../../vfr-planning/map/model/modelForMaps";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Place} from "../../../../../shared/model/waypoint";
import {WeatherParamsService} from "../../../../../shared/services/weather-params.service";

@Component({
  selector: 'vfr-weater-manager',
  templateUrl: './weather-manager.component.html',
  styleUrls: ['./weather-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherManagerComponent implements OnInit, OnDestroy {
  @Input() fromParent!: Airport[];
  public type: string = "weather-form"
  actualWeatherIMGW$?: Observable<Weather>
  actualWeaterOpenMeteo?: Observable<Weather>
  actualWeather$?: Observable<Weather[]>
  private weatherList: Weather[] = [];
  private unsubscribeSignal: Subject<void> = new Subject();
  active: any;


  constructor(private readonly weatherService: WeatherService,
              private readonly common: CommonService,
              private readonly activeModal: NgbActiveModal,
              private readonly weatherParams: WeatherParamsService) {
  }


  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

  addNewWeatherPoint(inputPlace: Place) {
    if (inputPlace.lat && inputPlace.lng) {
      this.actualWeather$ = this.weatherService.getWeatherDataFromOPEN_METEO(inputPlace).pipe(
        map(place => {
          place.city = inputPlace.city ?? "NOT FIND"
          this.weatherList.push(place);
          return this.weatherList
        }))
    }
    /*TODO */
    console.error("TO CHECK THIS LOGIC ")
  }

  setWeatherConditions($event: Weather) {
    this.weatherParams.setWeatherParams($event)
  }
}
