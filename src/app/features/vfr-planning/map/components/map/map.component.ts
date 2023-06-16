import {Component, Input, OnInit} from '@angular/core';
import * as L from "leaflet";
import {Circle, latLng, layerGroup, LeafletMouseEvent, marker, Polyline, polyline, tileLayer} from "leaflet";
import {markerIconDefault} from "../../../../../constanst/marker.constans";
import {RouteService} from "../../../../../shared/services/state/route-state/route.service";
import {Route, Waypoint} from "../../../../../shared/model/waypoint";
import {v4 as uuid} from 'uuid'
import {map, Observable} from "rxjs";

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  @Input() airports$?: Observable<Circle[]>

  mapLayers$ = this.airports$?.pipe(map(el => this.mapLayers.overlays = {
    ...this.mapLayers.overlays,
    'Airports': layerGroup(el),
  }))
  routeBetweenMarkers: Polyline = polyline(([]));

  mapLayers = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      }),
    },
    overlays: {
      'Airports': layerGroup(),
      'Zones': layerGroup(),
    }
  }
  map!: L.Map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
      // circle([46.95, -122], {radius: 5000}),
      // marker([46.879966, -121.726909],)
    ],
    zoom: 7,
    center: latLng(52.06, 19.25)

  };
  actualRoute?: Route;
  listOfMarkers: Waypoint[] = []
  mapLayer: any = [];

  constructor(private readonly routeService: RouteService) {
  }

  ngOnInit(): void {
    this.routeService.selectedRoute$
      .subscribe(route => {
        this.actualRoute = route;
        this.listOfMarkers = this.actualRoute.listOfWaypoints;
        this.calculateRouteBetweenMarkers();
        this.prepareActualRoute();
        console.log(this.mapLayers)
      })
  }

  mapClicked($event: LeafletMouseEvent): void {
    this.addNewMarker($event)
    this.routeService.addWaypointsInRoute(this.listOfMarkers)
  }

  private calculateRouteBetweenMarkers(): void {
    this.routeBetweenMarkers = polyline(([]))
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

  updateRouteOnMap(event: any) {
    this.routeService.setRoute(this.actualRoute!)
  }
}
