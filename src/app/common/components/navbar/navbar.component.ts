import {ChangeDetectionStrategy, Component, ComponentFactory, ComponentFactoryResolver, OnInit} from '@angular/core';
import {NgbModal, NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {
  WeatherManagerComponent
} from "../../../features/vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {CommonService} from "../../services/communication/firebase-communication/common.service";
import {
  FlightParametersComponent
} from "../../../features/vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {filter, map, Observable} from "rxjs";
import {Route} from "@shared";
import {RouteService} from "../../../shared/services/state";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {WaypointManagerDialogComponent} from "../../../features/vfr-waypoints/waypoint-manager-dialog.component";
import {PopoverFlightDataComponent} from "../popover-flight-data/popover-flight-data.component";
import {TranslocoModule} from "@ngneat/transloco";
import {LoginStatusDirective} from "../../directive/login-status/login-status.directive";
import {AsyncPipe, NgIf} from "@angular/common";
import {DynamicComponent} from "../../directive/dynamic-component/dynamic-component.directive";


@Component({
  selector: 'vfr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoModule,
    NgbPopoverModule,
    LoginStatusDirective,
    AsyncPipe,
    DynamicComponent,
    NgIf
  ],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  route$: Observable<Route> = this.routeService.selectedRoute$;
  componentFactory!: ComponentFactory<any>;

  isLogged: Observable<any> = this.auth.authState$;
  activatedRoute$: Observable<string> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((el: NavigationEnd) => el.url))

  constructor(private readonly modalService: NgbModal,
              private readonly common: CommonService,
              private readonly routeService: RouteService,
              private readonly router: Router,
              private readonly auth: AuthService,
              private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(PopoverFlightDataComponent);
  }

  openWeatherModal(): void {
    this.openModal(WeatherManagerComponent)
  }

  openFlightParameterModal(): void {
    this.openModal(FlightParametersComponent)
  }

  openAirportModal(): void {
    this.openModal(WaypointManagerDialogComponent);
  }

  private openModal(service: any) {
    this.modalService.open(service);
  }
}
