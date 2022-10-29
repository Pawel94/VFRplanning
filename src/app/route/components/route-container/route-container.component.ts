import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {RouteService} from "../../../shared/services/route.service";
import {Marker} from "leaflet";
import {Route} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.scss']
})
export class RouteContainerComponent implements OnInit {

  constructor(private readonly routeService: RouteService) {
  }

  route$: Observable<Marker[] | undefined> = this.routeService.selectedRoute$.pipe(map(x => x.listOfMarkers));
  actualRoute!: Route;

  ngOnInit(): void {
    this.routeService.selectedRoute$.subscribe(route =>
      this.actualRoute = route)
  }


  clearAllPoints(): void {
    this.routeService.setRoute({listOfWaypoints: [], listOfMarkers: []});

  }

  removeMarkerFromRoute(marker: Marker) {
    this.actualRoute?.listOfMarkers.forEach( (item, index) => {
      if(item === marker) this.actualRoute?.listOfMarkers.splice(index,1);
    });
    this.routeService.setRoute(this.actualRoute);
  }
}
