import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Route} from "../../../shared/model/waypoint";
import {DegreePipe} from "../../../common/pipes/degree.pipe";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'vfr-vfr-summary-table',
  standalone: true,
  imports: [CommonModule, DegreePipe],
  templateUrl: './vfr-summary-table.component.html',
  styleUrls: ['./vfr-summary-table.component.scss']
})
export class VfrSummaryTableComponent implements OnInit {
  @Input() route?: Route;
  @Output() waypoints = new EventEmitter<Route>();

  constructor() {
    console.log(this.route?.listOfWaypoints)
  }

  ngOnInit(): void {
  }

  deleteWaypoint(id?: string) {
    const news = this.route!.listOfWaypoints.filter(el => el.id !== id);
    const newRoute: Route = {
      ...this.route,
      listOfWaypoints: news,
    }
    this.waypoints.emit(newRoute)
  }
}
