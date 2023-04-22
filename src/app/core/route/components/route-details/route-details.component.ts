import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Marker} from "leaflet";
import {Waypoint} from "../../../../shared/model/waypoint";


@Component({
  selector: 'vfr-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {


  @Input() waypoints$?: Observable<Waypoint[] | undefined>
  @Output() removedWaypoint = new EventEmitter<Marker>();
  @Output() updatedWaypoint = new EventEmitter<Marker>();
  constructor() {
  }

  ngOnInit(): void {
  }

  updateWaypoint2($event: Marker) {
    this.updatedWaypoint.emit($event)
  }
  removedWaypoint2($event: Marker) {
    this.removedWaypoint.emit($event)
  }
}
