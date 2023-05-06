import {Marker} from "leaflet";

export interface Waypoint extends Marker {
  id?: string;
  nameOfPoint?: string;
  isFirstPoint?: boolean;
  distanceToNextPoint?: number;
  bearing?: number;
  timeToNextPoint?: number;
  city?:string
}

export interface Route {
  listOfWaypoints: Waypoint[];
  totalDistance?: number;
  totalTime?: number;
  planeVelocity: number
}


