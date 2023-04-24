import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {RouteService} from "../../../../../shared/services/route.service";
import {Marker} from "leaflet";
import {Route, Waypoint} from "../../../../../shared/model/waypoint";
import {removeElementFromList} from "../../../../../common/utils/utils";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaypointManagerDialogComponent} from "../waypoint-manager-dialog/waypoint-manager-dialog.component";
import {FlightParamsService} from "../../../../../shared/services/flight-params.service";
import {WeatherParamsService} from "../../../../../shared/services/weather-params.service";

@Component({
  selector: 'vfr-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.scss']
})
export class RouteContainerComponent implements OnInit, OnDestroy {

  constructor(private readonly routeService: RouteService,
              public readonly modalService: NgbModal,
              private readonly flightParams: FlightParamsService,
              private readonly weatherParams: WeatherParamsService) {
  }

  private unsubscribe$ = new Subject<void>;
  route$: Observable<Waypoint[]> = this.routeService.selectedRoute$.pipe(map(route => route.listOfWaypoints));
  actualRoute!: Route;

  model: any;

  ngOnInit(): void {
    this.routeService.selectedRoute$.subscribe(route =>
      this.actualRoute = route);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clearAllPoints(): void {
    this.routeService.setRoute({listOfWaypoints: []});

  }

  removeMarkerFromRoute(marker: Marker) {
    removeElementFromList(this.actualRoute.listOfWaypoints, marker)
    this.routeService.setRoute(this.actualRoute);
  }

  updateMarker(marker: Marker) {
    this.openModal(marker);
  }

  openModal(data?: Marker) {

    const modalRef = this.modalService.open(WaypointManagerDialogComponent);
    if (data) {
      modalRef.componentInstance.updateMarker = data;
      modalRef.componentInstance.isEditable = true;
    }
  }
}
