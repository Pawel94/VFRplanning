import {Marker} from "leaflet";
import {v4 as uuid} from "uuid";

export interface Waypoint extends Marker, Place {
  id?:string;
  nameOfPoint?: string;
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
