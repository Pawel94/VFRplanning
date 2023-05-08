import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  WeatherManagerComponent
} from "../../../features/vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {CommonService} from "../../services/communication/firebase-communication/common.service";
import {
  FlightParametersComponent
} from "../../../features/vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {filter, map, Observable} from "rxjs";
import {Route} from "../../../shared/model/waypoint";
import {RouteService} from "../../../shared/services/state/route-state/route.service";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  route$: Observable<Route> = this.routeService.selectedRoute$;

  isLogged: Observable<any> = this.auth.authState$;
  activatedRoute$: Observable<string> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((el: NavigationEnd) => el.url))

  constructor(private readonly modalService: NgbModal,
              private readonly common: CommonService,
              private readonly routeService: RouteService,
              private readonly router: Router,
              private readonly auth: AuthService
  ) {

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
