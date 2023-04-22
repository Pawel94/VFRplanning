import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from "../../../../shared/model/waypoint";
import {Marker} from "leaflet";

@Component({
  selector: 'vfr-waypoint-details',
  templateUrl: './waypoint-details.component.html',
  styleUrls: ['./waypoint-details.component.scss']
})
export class WaypointDetailsComponent implements OnInit {

  @Input()
  waypoint?:Waypoint;
  @Output() removedCurrentWaypoint = new EventEmitter<Marker>();
  @Output() updateCurrentWaypoint = new EventEmitter<Marker>();
  constructor() { }

  ngOnInit(): void {
  }
  removeWaypoint(element: any) {
    this.removedCurrentWaypoint.emit(element);
  }
  updateWaypoint(element: any) {
    console.log(element)
    this.updateCurrentWaypoint.emit(element);
  }
}
