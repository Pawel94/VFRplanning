import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {latLng, LeafletMouseEvent, marker, Polyline, polyline, tileLayer} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {RouteService} from "../../../shared/services/route.service";
import {Route, Waypoint} from "../../../shared/model/waypoint";
import {v4, v4 as uuid} from 'uuid'

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  routeBetweenMarkers: Polyline = polyline(([]));
  listOfWayPoints: Waypoint[] = []
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
  list?: Polyline[] = [];
  actualRoute: Route = {listOfWaypoints: []};
  listOfMarkers: Waypoint[] = []
  mapLayer: any = [];
  markerToAdd2?: Waypoint;

  constructor(private readonly routeService: RouteService) {
    this.routeService.selectedRoute$
      .subscribe(route => {
        this.actualRoute = route;
        this.listOfMarkers = this.actualRoute.listOfWaypoints;
        this.calculateRouteBetweenMarkers();
        this.prepareActualRoute();
        console.log(this.actualRoute)
      })
  }

  ngOnInit(): void {
  }

  mapClicked($event: LeafletMouseEvent) {
    this.addNewMarker($event)
    this.actualRoute.listOfWaypoints = this.listOfMarkers;
    this.routeService.setRoute(this.actualRoute)

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
    this.markerToAdd2 = {} as Waypoint
    this.markerToAdd2 = marker(event.latlng, markerIconDefault);
    this.markerToAdd2.id = uuid()
    this.listOfMarkers.push(this.markerToAdd2)
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngAfterViewInit(): void {
    this.calculateRouteBetweenMarkers()
  }

  updateRouteOnMap(event: any) {
    this.routeService.setRoute(this.actualRoute)
  }
}
