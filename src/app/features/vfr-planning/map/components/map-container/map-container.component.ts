import {Component, Output} from '@angular/core';
import {MapService} from "../../../../../common/services/api/map.service";
import {Circle} from "leaflet";
import {Observable} from "rxjs";


@Component({
  selector: 'vfr-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent {
  @Output() airports$: Observable<Circle[]> = this.mapService.findAirportsFrom()

  constructor(private readonly mapService: MapService) {
  }

}
