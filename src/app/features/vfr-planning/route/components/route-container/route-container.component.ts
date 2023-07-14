import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject} from "rxjs";

import {Marker} from "leaflet";
import {Route, Waypoint} from "@shared";
import {removeElementFromList} from "../../../../../shared/utils/utils";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaypointManagerDialogComponent} from "../../../../vfr-waypoints/waypoint-manager-dialog.component";
import {FlightParamsService, RouteService, WeatherParamsService} from "../../../../../shared/+state";
import { RouterLink } from '@angular/router';
import { RouteDetailsComponent } from '../route-details/route-details.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';


@Component({
    selector: 'vfr-route-container',
    templateUrl: './route-container.component.html',
    styleUrls: ['./route-container.component.scss'],
    standalone: true,
    imports: [TranslocoModule, NgIf, RouteDetailsComponent, RouterLink]
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
    this.routeService.clearRoute();
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
