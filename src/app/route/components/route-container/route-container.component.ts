import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {RouteService} from "../../../shared/services/route.service";
import {Marker} from "leaflet";
import {Route, Waypoint} from "../../../shared/model/waypoint";
import {removeElementFromList} from "../../../common/utils/utils";

@Component({
  selector: 'vfr-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.scss']
})
export class RouteContainerComponent implements OnInit, OnDestroy {

  constructor(private readonly routeService: RouteService) {
  }

  route$: Observable<Waypoint[]> = this.routeService.selectedRoute$.pipe(map(x => x.listOfWaypoints));
  actualRoute!: Route;

  ngOnInit(): void {
    this.routeService.selectedRoute$.subscribe(route =>
      this.actualRoute = route);
  }

  ngOnDestroy() {
    /** Add destroy **/
  }

  clearAllPoints(): void {
    this.routeService.setRoute({listOfWaypoints: []});

  }

  removeMarkerFromRoute(marker: Marker) {
    removeElementFromList(this.actualRoute.listOfWaypoints, marker)
    this.routeService.setRoute(this.actualRoute);
  }
}
