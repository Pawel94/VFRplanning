import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VfrSummaryTableComponent} from "../vfr-summary-table/vfr-summary-table.component";

import {Observable} from "rxjs";
import {Route} from "@shared";
import {VfrSummaryPanelComponent} from "../vfr-summary-panel/vfr-summary-panel.component";

import {FlightParams} from "@shared";
import {Weather} from "@features/vfr-parameters";
import {
  FlightParametersComponent
} from "../../vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {WeatherManagerComponent} from "../../vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {CommonService} from "../../../shared/services";
import {PlaneType} from "@features/vfr-parameters";
import {FlightParamsService, RouteService, WeatherParamsService} from "../../../shared/+state";


@Component({
  selector: 'vfr-summary-page-manager',
  standalone: true,
  imports: [CommonModule, VfrSummaryTableComponent, VfrSummaryPanelComponent],
  templateUrl: './vfr-summary-manager.component.html',
  styleUrls: ['./vfr-summary-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class VfrSummaryManagerComponent {

  route$?: Observable<Route> = this.routeService.selectedRoute$;
  flightParams$?: Observable<FlightParams> = this.flightService.selectFlightParams$;

  weatherParams$?: Observable<Weather> = this.weatherService.selectWeatherParams;

  planeTypeInformation$: Observable<PlaneType | null> = this.dateBase.getPlaneFromDB();

  constructor(private readonly routeService: RouteService,
              private readonly flightService: FlightParamsService,
              private readonly weatherService: WeatherParamsService,
              private readonly modalService: NgbModal,
              private readonly dateBase: CommonService) {
  }

  changeWaypoints($event: Route) {
    this.routeService.setRoute($event)
  }

  openFlightParamsDialog() {
    this.modalService.open(FlightParametersComponent)
  }

  openWeatherDialog() {
    this.modalService.open(WeatherManagerComponent)
  }
}
