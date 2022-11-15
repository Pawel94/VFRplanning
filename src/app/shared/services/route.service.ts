import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Route, Waypoint} from "../model/waypoint";
import {
  accumulateDistance,
  addNameToPoints,
  calculateBearing,
  calculateTimeBetweenWaypoints,
  calculateTotalDistance
} from "../../common/utils/utils";
import {FlightParamsService} from "./flight-params.service";
import {FlightParams} from "../model/flightParamsModel";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route$ = new BehaviorSubject<Route>({listOfWaypoints: []},);
  selectedRoute$ = this.route$.asObservable()
  flightParams?: FlightParams;

  constructor(private flightParamsService: FlightParamsService) {
    flightParamsService.selectFlightParams$.subscribe(params =>
      this.flightParams = params
    )
  }


  setRoute(route: Route) {
    console.log(this.flightParams)
    this.prepareWaypoints(route);
    this.route$.next(route);
  }

  createWaypoint(data: any): Waypoint {
    const waypoint = {} as Waypoint;
    waypoint.lat = data.lat;
    waypoint.lng = data.lng
    return waypoint
  }

  private prepareWaypoints(route: Route) {
    if (route.listOfWaypoints.length > 0) {
      accumulateDistance(route.listOfWaypoints);
      calculateBearing(route.listOfWaypoints);
      addNameToPoints(route.listOfWaypoints)
      calculateTimeBetweenWaypoints(route.listOfWaypoints, this.flightParams!.planeVelocity)
      route.totalDistance = calculateTotalDistance(route.listOfWaypoints, "distanceToNextPoint")
      route.totalTime = calculateTotalDistance(route.listOfWaypoints, "timeToNextPoint")
    }
  }
}
