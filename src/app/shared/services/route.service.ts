import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Route, Waypoint} from "../model/waypoint";
import {
  accumulateDistance,
  addNameToPoints,
  calculateBearing,
  calculateTimeBetweenWaypoints
} from "../../common/utils/utils";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route$ = new BehaviorSubject<Route>({listOfWaypoints: []});
  selectedRoute$ = this.route$.asObservable()

  constructor() {
  }


  setRoute(route: Route) {
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
      calculateTimeBetweenWaypoints(route.listOfWaypoints, 120)
    }
  }
}
