import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Route, Waypoint} from "../../../model/waypoint";
import {
  accumulateDistance,
  addNameToPoints,
  calculateBearing,
  calculateTimeBetweenWaypoints,
  calculateTotalDistance
} from "../../../../common/utils/utils";


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private route$ = new BehaviorSubject<Route>({listOfWaypoints: [], planeVelocity: 100},);
  selectedRoute$ = this.route$.asObservable()

  setRoute(route: Route) {
    this.route$.next(route);
    this.calculateRoute()
  }

  addWaypointsInRoute(listOfWaypoints: Waypoint[]) {
    this.route$.next({
      ...this.route$.value,
      listOfWaypoints
    });
    this.calculateRoute()
  }

  clearRoute() {
    this.route$.next({listOfWaypoints: [], planeVelocity: 100});
    this.calculateRoute()

  }

  setVelocity(planeVelocity: number) {
    this.route$.next({...this.route$.value, planeVelocity: planeVelocity});
    this.calculateRoute()
  }


  private calculateRoute() {
    const route = this.route$.value.listOfWaypoints
    const planeVelocity = this.route$.value.planeVelocity
    if (route.length > 0) {
      accumulateDistance(this.route$.value.listOfWaypoints);
      calculateBearing(route);
      addNameToPoints(route)
      calculateTimeBetweenWaypoints(route, planeVelocity)
      this.route$.value.totalDistance = calculateTotalDistance(route, "distanceToNextPoint")
      this.route$.value.totalTime = calculateTotalDistance(route, "timeToNextPoint")
    }

  }
}
