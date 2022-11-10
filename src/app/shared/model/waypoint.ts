import {Marker} from "leaflet";

export interface Waypoint extends Marker,Place {
  nameOfPoint?:string;
  isFirstPoint?: boolean;
  distanceToNextPoint?: number;
  bearing?: number;
  timeToNextPoint?: number;
}

export interface Route {
  listOfWaypoints: Waypoint[];
}
export interface Place {
  lat?: number;
  lng?: number;
  city?: string
}
