import {ChangeDetectionStrategy, Component, DestroyRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VfrSummaryTableComponent} from "../vfr-summary-table/vfr-summary-table.component";

import {catchError, EMPTY, filter, map, Observable, switchMap} from "rxjs";
import {FlightParams, Route} from "@shared";
import {VfrSummaryPanelComponent} from "../vfr-summary-panel/vfr-summary-panel.component";
import {PlaneType, Weather} from "@features/vfr-parameters";
import {
    FlightParametersComponent
} from "../../vfr-parameters/flight-parameters/component/flight-parameters/flight-parameters.component";
import {WeatherManagerComponent} from "../../vfr-parameters/weater/component/weather-manager/weather-manager.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {CommonService, MapService, NotificationService} from "../../../shared/services";
import {FlightParamsService, RouteService, WeatherParamsService} from "@state";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


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
                private readonly notification: NotificationService,
                private readonly modalService: NgbModal,
                private readonly mapService: MapService,
                private readonly dateBase: CommonService,
                private readonly destroyRef: DestroyRef) {
    }

    changeWaypoints($event: Route): void {
        this.routeService.setRoute($event)
    }

    openFlightParamsDialog(): void {
        this.modalService.open(FlightParametersComponent)
    }

    openWeatherDialog(): void {
        this.modalService.open(WeatherManagerComponent)
    }

    saveRoute(): void {
        this.route$?.pipe(
            filter(x => x !== null),
            map(elements => elements.listOfWaypoints),
            switchMap(route => this.mapService.addRouteToFirebase(route)),
            catchError((err) => {
                this.notification.getFailure("summary.pushError", {params:err})
                return EMPTY;
            }),
            takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.notification.getSuccess("summary.pushSuccess", {}));
    }
}
