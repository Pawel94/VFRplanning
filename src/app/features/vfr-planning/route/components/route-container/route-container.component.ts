import {Component, DestroyRef, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";

import {Marker} from "leaflet";
import {Route, Waypoint} from "@shared";
import {removeElementFromList} from "../../../../../shared/utils/utils";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaypointManagerDialogComponent} from "../../../../vfr-waypoints/waypoint-manager-dialog.component";
import {RouteService} from "@state";
import {RouterLink} from '@angular/router';
import {RouteDetailsComponent} from '../route-details/route-details.component';
import {NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';
import {NotificationService} from "../../../../../shared/services";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'vfr-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.scss'],
  standalone: true,
  imports: [TranslocoModule, NgIf, RouteDetailsComponent, RouterLink]
})
export class RouteContainerComponent implements OnInit {

  constructor(private readonly routeService: RouteService,
              public readonly modalService: NgbModal,
              private readonly notification: NotificationService,
              private readonly destroyRef: DestroyRef) {
  }

  route$: Observable<Waypoint[]> = this.routeService.selectedRoute$.pipe(map(route => route.listOfWaypoints));
  actualRoute!: Route;


  ngOnInit(): void {
    this.routeService.selectedRoute$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(route =>
      this.actualRoute = route);
  }


  clearAllPoints(): void {
    this.notification.getWarning('notification.infoRemoveAll', {})
    this.routeService.clearRoute();
  }

  removeMarkerFromRoute(marker: Marker) {
    removeElementFromList(this.actualRoute.listOfWaypoints, marker)
    this.notification.getWarning('notification.infoRemove', {})
    this.routeService.setRoute(this.actualRoute);
  }

  updateMarker(marker: Marker):void {
    this.openModal(marker);
  }

  openModal(data?: Marker):void  {
    const modalRef = this.modalService.open(WaypointManagerDialogComponent);
    if (data) {
      modalRef.componentInstance.updateMarker = data;
      modalRef.componentInstance.isEditable = true;
    }
  }
}
