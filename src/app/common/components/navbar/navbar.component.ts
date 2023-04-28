import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../../../features/vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {CommonService} from "../../services/communication/firebase-communication/common.service";
import {
  FlightParametersComponent
} from "../../../features/vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {Observable} from "rxjs";
import {Route} from "../../../shared/model/waypoint";
import {RouteService} from "../../../shared/services/state/route-state/route.service";

@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  route$: Observable<Route> = this.routeService.selectedRoute$;

  constructor(private modalService: NgbModal,
              private readonly common: CommonService,
              private readonly routeService: RouteService) {
  }


  openWeatherModal() {
    this.openModal(WeatherManagerComponent)
  }

  openFlightParameterModal() {
    this.openModal(FlightParametersComponent)
  }

  private openModal(service: any) {
    this.modalService.open(service);
  }
}
