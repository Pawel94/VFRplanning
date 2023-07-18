import {ChangeDetectionStrategy, Component} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {FlightParams, Route} from "@shared";

import {TranslocoModule} from "@ngneat/transloco";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {FlightParamsService, RouteService, WeatherParamsService} from "@state";
import {Weather} from "@features/vfr-parameters";


@Component({
  selector: 'vfr-popover-flight-data',
  templateUrl: './popover-flight-data.component.html',
  styleUrls: ['./popover-flight-data.component.scss'],
  imports: [
    TranslocoModule,
    AsyncPipe,
    NgIf,
    JsonPipe,
    CommonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverFlightDataComponent {
  route$: Observable<Route> = this.routeService.selectedRoute$;
  flightParams$: Observable<FlightParams> = this.flightService.selectFlightParams$;
  weatherParams$: Observable<Weather> = this.weatherService.selectWeatherParams;
  vw$ = combineLatest([this.route$, this.weatherParams$, this.flightParams$])
    .pipe(map(([route, weather, flight]) => ({route, weather, flight})));


  constructor(private readonly routeService: RouteService,
              private readonly flightService: FlightParamsService,
              private readonly weatherService: WeatherParamsService) {
  }
}
