import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Route} from "@shared";
import {DegreePipe} from "../../../common/pipes/degree-pipe/degree.pipe";
import {CommonModule} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import {DistancePipe} from "../../../common/pipes/distance-pipe/distance.pipe";
import {TimePipe} from "../../../common/pipes/time-pipe/time.pipe";


@Component({
  selector: 'vfr-vfr-summary-table',
  standalone: true,
  imports: [CommonModule, DegreePipe, TranslocoModule, DistancePipe, TimePipe],
  templateUrl: './vfr-summary-table.component.html',
  styleUrls: ['./vfr-summary-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VfrSummaryTableComponent {
  @Input() route?: Route;
  @Output() waypoints = new EventEmitter<Route>();


  deleteWaypoint(id?: string) {
    if (this.route) {
      const news = this.route!.listOfWaypoints.filter(el => el.id !== id);
      const newRoute: Route = {
        ...this.route,
        listOfWaypoints: news,
      }
      this.waypoints.emit(newRoute)
    }
  }
}
