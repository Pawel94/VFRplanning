import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "../../../../../shared/services/route.service";
import {Route, Waypoint} from 'src/app/shared/model/waypoint';
import {LatLng} from "leaflet";


@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager-dialog.component.html',
  styleUrls: ['./waypoint-manager-dialog.component.scss']
})
export class WaypointManagerDialogComponent implements OnInit, OnDestroy {
  @Input() public updateMarker?: Waypoint;


  public type: string = "waypoint-form"

  private actualRoute!: Route;
  private unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly mapService: MapService,
              private readonly routeService: RouteService,
  ) {

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

  editWaypoint(waypointToAdd: Waypoint) {
    const latLng = new LatLng(Number(waypointToAdd.lat), Number(waypointToAdd.lng));
    waypointToAdd.setLatLng(latLng)
    this.routeService.setRoute(this.actualRoute);

    this.closeModal()
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

}

