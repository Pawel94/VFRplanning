import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Subject, takeUntil} from "rxjs";
import {RouteService} from "../../../shared/services/route.service";
import {Route, Waypoint} from 'src/app/shared/model/waypoint';
import {LatLng, Marker} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {v4 as uuid} from "uuid";


@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager.component.html',
  styleUrls: ['./waypoint-manager.component.scss']
})
export class WaypointManagerComponent implements OnInit, OnDestroy {
  @Input() public updateMarker?: Waypoint;
  @Input() public isEditable?: boolean;
  public type: string = "waypoint-form"
  public model: any;
  private actualRoute!: Route;
  private unsubscribeSignal: Subject<void> = new Subject();
  private newWaypointToAdd?: Waypoint;

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
    console.log(this.updateMarker?.getLatLng())
    console.log(this.isEditable);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  addNewWaypoint(waypointToAdd: Waypoint) {
    const latLng = new LatLng(Number(waypointToAdd.lat), Number(waypointToAdd.lng));

    this.newWaypointToAdd = {} as Waypoint;
    this.newWaypointToAdd = new Marker(latLng, markerIconDefault)
    this.newWaypointToAdd.id = uuid()

    this.actualRoute?.listOfWaypoints.push(this.newWaypointToAdd);
    this.routeService.setRoute(this.actualRoute);
  }

  editWaypoint(waypointToAdd: Waypoint) {
    const latLng = new LatLng(Number(waypointToAdd.lat), Number(waypointToAdd.lng));

    waypointToAdd.setLatLng(latLng)
    let users = this.actualRoute?.listOfWaypoints.map(u => u.id !== waypointToAdd.id ? u : waypointToAdd);
    this.routeService.setRoute(this.actualRoute);
  }
}

