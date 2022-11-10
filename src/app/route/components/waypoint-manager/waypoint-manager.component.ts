import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "../../../shared/services/route.service";
import {Place, Route} from 'src/app/shared/model/waypoint';
import {LatLng, Marker} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";


@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager.component.html',
  styleUrls: ['./waypoint-manager.component.scss']
})
export class WaypointManagerComponent implements OnInit, OnDestroy {
  public model: any;
  private actualRoute!: Route;
  private unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly mapService: MapService,
              private readonly routeService: RouteService,
  ) {
  }


  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

  ngOnInit(): void {
    this.routeService.selectedRoute$
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(route =>
        this.actualRoute = route);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  addNewWaypoint(waypointToAdd: Place) {
    const latLng = new LatLng(Number(waypointToAdd.lat), Number(waypointToAdd.lng));
    this.actualRoute?.listOfWaypoints.push(new Marker(latLng, markerIconDefault));
    this.routeService.setRoute(this.actualRoute);
  }
}

