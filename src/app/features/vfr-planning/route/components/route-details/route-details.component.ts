import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Marker} from "leaflet";
import {Waypoint} from "@shared";


@Component({
  selector: 'vfr-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDetailsComponent {


  @Input() waypoints$?: Observable<Waypoint[] | undefined>
  @Output() removedWaypoint = new EventEmitter<Marker>();
  @Output() updatedWaypoint = new EventEmitter<Marker>();

  updateWaypoint($event: Marker) {
    this.updatedWaypoint.emit($event)
  }

  removeWaypoint($event: Marker) {
    this.removedWaypoint.emit($event)
  }
}
