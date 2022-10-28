import { Component, OnInit } from '@angular/core';
import {MapService} from "../../services/map.service";

@Component({
  selector: 'vfr-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {

  constructor(private readonly mapService:MapService) { }

  ngOnInit(): void {
    this.mapService.findAirPortsFrom("null").subscribe();
  }

}
