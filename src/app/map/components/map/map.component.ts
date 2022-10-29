import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {latLng, LayerGroup, LeafletMouseEvent, Marker, marker, Polyline, polyline, tileLayer} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {RouteService} from "../../../shared/services/route.service";
import {Route, Waypoint} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  routeBetweenMarkers: Polyline = polyline(([]));
  listOfWayPoints: Waypoint[] = []
  sMarkersLayer!: LayerGroup;
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
  actualRoute: Route = {listOfWaypoints: [], listOfMarkers: []};
  listOfMarkers: Marker[] = []
  mapLayer: any = [];

  constructor(private readonly routeService: RouteService) {
    this.routeService.selectedRoute$
      .subscribe(route => {
              this.actualRoute = route;
        this.listOfMarkers = this.actualRoute.listOfMarkers;
        this.calculateRouteBetweenMarkers();
        this.prepareActualRoute();
      })
  }

  ngOnInit(): void {
  }

  mapClicked($event: LeafletMouseEvent) {
    this.addNewMarker($event)
    this.actualRoute.listOfMarkers = this.listOfMarkers;
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
    this.listOfMarkers.push(marker(event.latlng, markerIconDefault))
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }
}
