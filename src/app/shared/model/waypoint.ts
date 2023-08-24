import {Marker} from "leaflet";

export interface Waypoint extends Marker {
    id?: string;
    nameOfPoint?: string;
    isFirstPoint?: boolean;
    distanceToNextPoint?: number;
    bearing?: number;
    timeToNextPoint?: number;
    city?: string
    lat: number,
    lng: number
    latLng: LatLng
}

export interface Route {
    listOfWaypoints: Waypoint[];
    totalDistance?: number;
    totalTime?: number;
    planeVelocity: number
}

export type LatLng = {
    lat: number,
    lng: number
}

export type WaypointExport = Pick<Waypoint, "id" | "nameOfPoint" | "latLng"> & { userId?: string }



