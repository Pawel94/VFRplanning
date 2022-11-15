import {Marker} from "leaflet";

export interface Waypoint extends Marker, Place {
  id?: string;
  nameOfPoint?: string;
  isFirstPoint?: boolean;
  distanceToNextPoint?: number;
  bearing?: number;
  timeToNextPoint?: number;
}

export interface Route {
  listOfWaypoints: Waypoint[];
  totalDistance?: number;
  totalTime?: number;
  planeVelocity?: number
}

export interface Place {
  lat?: number;
  lng?: number;
  city?: string
}
