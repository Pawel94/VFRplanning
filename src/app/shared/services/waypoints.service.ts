import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Route, Waypoint} from "../model/waypoint";

@Injectable({
  providedIn: 'root'
})
export class WaypointsService {
  private route$ = new BehaviorSubject<Route>({listOfWaypoints: []});
  selectedRoute$ = this.route$.asObservable()

  constructor() {
  }


  setRoute(route: Route) {
    this.route$.next(route);
  }

  createWaypoint(data: any): Waypoint {
    const waypoint = {} as Waypoint;
    waypoint.lat = data.lat;
    waypoint.lng = data.lng
    return waypoint
  }
}
