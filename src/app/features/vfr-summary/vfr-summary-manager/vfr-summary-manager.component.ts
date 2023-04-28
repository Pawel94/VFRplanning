import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VfrSummaryTableComponent} from "../vfr-summary-table/vfr-summary-table.component";
import {RouteService} from "../../../shared/services/state/route-state/route.service";
import {Observable} from "rxjs";
import {Route} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-summary-page-manager',
  standalone: true,
  imports: [CommonModule, VfrSummaryTableComponent],
  templateUrl: './vfr-summary-manager.component.html',
  styleUrls: ['./vfr-summary-manager.component.scss']
})
export class VfrSummaryManagerComponent implements OnInit {

  route$?: Observable<Route> = this.routeService.selectedRoute$;

  constructor(private readonly routeService: RouteService) {
  }

  ngOnInit(): void {
    this.route$?.subscribe(x => console.log(x))
  }

  changeWaypoints($event: Route) {
    this.routeService.setRoute($event)
  }
}
