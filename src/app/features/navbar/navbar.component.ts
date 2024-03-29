import {ChangeDetectionStrategy, Component, ComponentFactory, ComponentFactoryResolver, OnInit} from '@angular/core';
import {NgbModal, NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {WeatherManagerComponent} from "../vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {AuthService, CommonService} from "../../shared/services";
import {
  FlightParametersComponent
} from "../vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {filter, map, Observable} from "rxjs";
import {Route} from "@shared";

import {NavigationEnd, Router} from "@angular/router";
import {WaypointManagerDialogComponent} from "../vfr-waypoints/waypoint-manager-dialog.component";
import {PopoverFlightDataComponent} from "../popover-flight-data/popover-flight-data.component";
import {TranslocoModule} from "@ngneat/transloco";
import {LoginStatusDirective} from "../../shared/directive/login-status/login-status.directive";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {DynamicComponent} from "../../shared/directive/dynamic-component/dynamic-component.directive";
import {RouteService} from "@state";


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
        NgIf,
        JsonPipe
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
                private readonly componentFactoryResolver: ComponentFactoryResolver
    ) {

    }

    ngOnInit(): void {
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

    private openModal(service: any): void {
        this.modalService.open(service);
    }

    loadDemoRoute(): void {
        this.routeService.loadDemoRoute()
    }
}
