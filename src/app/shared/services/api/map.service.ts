import {Injectable} from '@angular/core';

import {AirportsDTO} from "@features/vfr-planning"
import {icon, Marker, marker, MarkerOptions} from "leaflet";
import {markerAirportIcon} from "../../constant";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {from, map, Observable, shareReplay} from 'rxjs';
import {Waypoint, WaypointExport} from "@shared";
import {v4 as uuid} from "uuid";

@Injectable({
    providedIn: 'root'
})
export class MapService {


    constructor(private readonly db: AngularFireDatabase,
    ) {
    }

    /** TODO add zones - ready endpoint **/


    findAirportsFromDB(): Observable<Marker[]> {
        // @ts-ignore
        return this.db.list<AirportsDTO>('/airports').valueChanges()
            .pipe(
                // @ts-ignore
                map((airport) => this.extractMarker(airport)),
                shareReplay())
    }

    addRouteToFirebase(data: Waypoint[]): Observable<unknown> {
        return from(this.db.list('route').set(uuid(), this.mapToWaypointExport(data)));
    }

    getDemoRouteFromFirebase(): Observable<WaypointExport[]> {
        // @ts-ignore
        return this.db.object<WaypointExport[]>('/route/demoData').valueChanges()

    }

    getRouteFromFirebase(routeId?: string): Observable<WaypointExport[]> {
        // @ts-ignore
        return this.db.object<WaypointExport[]>(`/route/${routeId}`).valueChanges()
    }

    private createMarkerOptions(airport: AirportsDTO): MarkerOptions {
        return {
            title: airport.code,
            draggable: false,
            icon: icon(markerAirportIcon)
        } as MarkerOptions

    }

    private extractMarker(airport: AirportsDTO[]) {
        return airport.map(data =>
            marker([data.coordinates.latitude, data.coordinates.longitude],
                this.createMarkerOptions(data)))

    }

    private mapToWaypointExport(data: Waypoint[]): WaypointExport[] {
        if (data.length === 0) throw Error("Empty list of waypoints")
        return data.map(element => {
                const {id, latLng} = element
                return {
                    id,
                    latLng,
                } as WaypointExport

            }
        )
    }

}
