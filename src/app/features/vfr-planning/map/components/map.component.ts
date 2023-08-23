import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit} from '@angular/core';
import * as L from "leaflet";
import {layerGroup, LeafletMouseEvent, marker, Polyline, polyline} from "leaflet";
import {MAP_LAYERS, MAP_OPTIONS, markerIconDefault} from "../../../../shared/constant";

import {Route, Waypoint} from "@shared";
import {v4 as uuid} from 'uuid'
import {map} from "rxjs";
import {MapService} from "../../../../shared/services";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {RouteService, TriggerService} from "@state";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, LeafletModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class MapComponent implements OnInit {

  mapLayers$ = this.mapService?.findAirportsFromDB().pipe(map(el => this.mapLayers.overlays = {
    ...this.mapLayers.overlays,
    'Airports': layerGroup(el),
  }))

  routeBetweenMarkers: Polyline = polyline(([]),{color:'#F00', fillColor:'#F00'});

  mapLayers = MAP_LAYERS
  options = MAP_OPTIONS
  map!: L.Map;
  actualRoute?: Route;
  listOfMarkers: Waypoint[] = []
  mapLayer: any = [];

  constructor(private readonly routeService: RouteService,
              private readonly mapService: MapService,
              private readonly trigger: TriggerService,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.routeService.selectedRoute$.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(route => {
        this.actualRoute = route;
        this.listOfMarkers = this.actualRoute.listOfWaypoints;
        this.calculateRouteBetweenMarkers();
        this.prepareActualRoute();
      })
    this.detectChanges();
  }

  mapClicked($event: LeafletMouseEvent): void {
    this.addNewMarker($event)
    this.routeService.addWaypointsInRoute(this.listOfMarkers)
  }

  private calculateRouteBetweenMarkers(): void {
    this.routeBetweenMarkers = polyline(([]),{color:'#155e75cc'})
    this.listOfMarkers.forEach(marker => {
      this.routeBetweenMarkers.addLatLng(marker.getLatLng())
    })
  }

  private prepareActualRoute(): void {
    this.mapLayer = [];
    this.mapLayer.push(...this.listOfMarkers, this.routeBetweenMarkers);
  }

  private addNewMarker(event: LeafletMouseEvent) {
    const newWaypoint = marker(event.latlng, markerIconDefault) as Waypoint
    newWaypoint.id = uuid()
    this.listOfMarkers.push(newWaypoint)
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  private detectChanges(): void {
    this.trigger.triggered$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.changeDetector.detectChanges();
        this.updateRouteOnMap()
      }
    )
  }

  updateRouteOnMap(event?: any) {
    this.routeService.setRoute(this.actualRoute!)
  }
}
