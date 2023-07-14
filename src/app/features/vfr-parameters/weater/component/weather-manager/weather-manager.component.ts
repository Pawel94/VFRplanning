import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../../../../shared/services";
import {map, Observable, Subject} from "rxjs";
import {Weather} from "../../../types/weater";
import {CommonService} from "../../../../../shared/services";

import { NgbActiveModal, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import {Waypoint} from "@shared";
import {WeatherParamsService} from "@state";
import {Airport} from '@features/vfr-planning';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ManualWeatherComponent } from '../manual-weather/manual-weather.component';
import { AutomaticWeatherComponent } from '../automatic-weather/automatic-weather.component';

@Component({
    selector: 'vfr-weater-manager',
    templateUrl: './weather-manager.component.html',
    styleUrls: ['./weather-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgbNavModule,
        AutomaticWeatherComponent,
        ManualWeatherComponent,
        NgIf,
        NgFor,
        AsyncPipe,
    ],
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

  addNewWeatherPoint(inputPlace: Waypoint) {
    this.actualWeather$ = this.weatherService.getWeatherDataFromOPEN_METEO(inputPlace).pipe(
      map(place => {
        place.city = inputPlace.city ?? "NOT FIND"
        this.weatherList.push(place);
        return this.weatherList
      }))
  }

  setWeatherConditions($event: Weather) {
    this.weatherParams.setWeatherParams($event)
  }
}
