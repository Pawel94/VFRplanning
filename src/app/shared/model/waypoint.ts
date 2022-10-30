import {Marker} from "leaflet";

export interface Waypoint extends Marker{
  lat?: string;
  lng?: string;
  name?: string
  isFirstPoint?: boolean;
  distanceToNextPoint?: number;
}

export interface Route {
  listOfWaypoints: Waypoint[];
  //listOfMarkers: Marker[];
}
