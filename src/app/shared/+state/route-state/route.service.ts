import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, take, tap} from "rxjs";
import {Route, Waypoint, WaypointExport} from "@shared";
import {
    accumulateDistance,
    addNameToPoints,
    calculateBearing,
    calculateTimeBetweenWaypoints,
    calculateTotalDistance
} from "../../utils/utils";
import {MapService, NotificationService} from "../../services";
import {marker} from "leaflet";
import {markerIconDefault} from "../../constant";


@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private route$ = new BehaviorSubject<Route>({listOfWaypoints: [], planeVelocity: 100},);
    selectedRoute$ = this.route$.asObservable()

    private readonly mapService = inject(MapService)
    private readonly notificationService = inject(NotificationService)

    setRoute(route: Route): void {
        this.route$.next(route);
        this.calculateRoute()
    }

    addWaypointsInRoute(listOfWaypoints: Waypoint[]): void {
        this.route$.next({
            ...this.route$.value,
            listOfWaypoints
        });
        this.calculateRoute()
    }

    clearRoute(): void {
        this.route$.next({listOfWaypoints: [], planeVelocity: 100});
        this.calculateRoute()

    }

    setVelocity(planeVelocity: number): void {
        this.route$.next({...this.route$.value, planeVelocity: planeVelocity});
        this.calculateRoute()
    }

    loadDemoRoute(): void {
        this.mapService.getDemoRouteFromFirebase()
            .pipe(
                take(1),
                tap(() => this.notificationService.getSuccess('route.successLoadData', {params:'DEMO ROUTE :)'})))
            .subscribe(el =>
                this.addWaypointsInRoute(this.mapWaypointsToMarkers(el)))
    }

    private mapWaypointsToMarkers(listOfWaypointExport: WaypointExport[]): Waypoint[] {
        return listOfWaypointExport.map(point => {
            return marker(point.latLng, markerIconDefault) as Waypoint
        })
    }

    private calculateRoute(): void {
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
