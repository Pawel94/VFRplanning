import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {RouteService} from "../../../../shared/services/route.service";
import {Marker} from "leaflet";
import {Route, Waypoint} from "../../../../shared/model/waypoint";
import {removeElementFromList} from "../../../../common/utils/utils";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaypointManagerComponent} from "../waypoint-manager/waypoint-manager.component";
import {latAndLngFormGroup} from "../../model";
import {FlightParams} from "../../../../shared/model/flightParamsModel";
import {FlightParamsService} from "../../../../shared/services/flight-params.service";
import {Weather} from "../../../weater/model/indexWeater";
import {WeatherParamsService} from "../../../../shared/services/weather-params.service";

@Component({
  selector: 'vfr-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.scss']
})
export class RouteContainerComponent implements OnInit, OnDestroy {

  constructor(private readonly routeService: RouteService,
              public readonly modalService: NgbModal,
              private readonly flightParams:FlightParamsService,
              private readonly weatherParams:WeatherParamsService) {
  }

  route$: Observable<Waypoint[]> = this.routeService.selectedRoute$.pipe(map(x => x.listOfWaypoints));
  flightParams$:Observable<FlightParams> = this.flightParams.selectFlightParams$
  weatherParams$:Observable<Weather> = this.weatherParams.selectWeatherParams
  actualRoute!: Route;
  editedValues?: latAndLngFormGroup = {} as latAndLngFormGroup
  model: any;

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

  updateMarker(marker: Marker) {

    this.openModal(marker);
  }

  openModal(data?: Marker) {
    console.log(data)
    const modalRef = this.modalService.open(WaypointManagerComponent);
    if (data) {
      modalRef.componentInstance.updateMarker = data;
      modalRef.componentInstance.isEditable = true;
    }
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }


}
