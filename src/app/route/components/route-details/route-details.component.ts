import {Component, OnInit} from '@angular/core';
import {WaypointsService} from "../../../shared/services/waypoints.service";
import {map, Observable} from "rxjs";
import {Waypoint} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {

  constructor(private readonly waypointsService: WaypointsService) {
  }

  waypoints$: Observable<Waypoint[]> = this.waypointsService.selectedRoute$.pipe(map(x => x.listOfWaypoints));

  ngOnInit(): void {
  }

}
