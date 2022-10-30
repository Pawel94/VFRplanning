import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Route, Waypoint} from "../model/waypoint";
import {accumulateDistance} from "../../common/utils/utils";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route$ = new BehaviorSubject<Route>({listOfWaypoints: []});
  selectedRoute$ = this.route$.asObservable()

  constructor() {
  }


  setRoute(route: Route) {
    this.calculateDistanceBetweenWaypoints(route);
    this.route$.next(route);
  }

  createWaypoint(data: any): Waypoint {
    const waypoint = {} as Waypoint;
    waypoint.lat = data.lat;
    waypoint.lng = data.lng
    return waypoint
  }

  private calculateDistanceBetweenWaypoints(route: Route) {
    if (route.listOfWaypoints.length > 0) {
      accumulateDistance(route.listOfWaypoints);
    }
  }
}
