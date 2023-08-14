import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Marker} from "leaflet";
import {Waypoint} from "@shared";
import { DistancePipe } from '@shared';
import { DegreePipe } from '@shared';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';


@Component({
    selector: 'vfr-route-details',
    templateUrl: './route-details.component.html',
    styleUrls: ['./route-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslocoModule,
        NgFor,
        NgIf,
        AsyncPipe,
        DegreePipe,
        DistancePipe,
    ],
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
