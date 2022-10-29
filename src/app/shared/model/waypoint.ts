import {Marker} from "leaflet";

export interface Waypoint {
  lat: string;
  lng: string;
  name: string
  isFirstPoint: boolean;
  distanceToNextPoint: number;
}

export interface Route {
  listOfWaypoints: any[];
  listOfMarkers: Marker[];
}
