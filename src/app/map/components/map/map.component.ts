import {Component, OnInit} from '@angular/core';
import {circle, latLng, LeafletMouseEvent, Marker, marker, Polyline, polyline, tileLayer} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {WaypointsService} from "../../../shared/services/waypoints.service";
import {Route, Waypoint} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  routeBetweenMarkers: Polyline = polyline(([]));
  listOfWayPoints: Waypoint[] = []
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
      circle([46.95, -122], {radius: 5000}),
      marker([46.879966, -121.726909],)
    ],
    zoom: 7,
    center: latLng(52.06, 19.25)

  };
  list?: Polyline;
  route: Route = {listOfWaypoints: []};
  listOfMarkers: Marker[] = []
  listOfPoints = [
    circle([46.95, -122], {radius: 5000}),
    marker([46.879966, -121.726909]),
    polyline(([[28.635308, 77.22496], [46.879966, -121.726909]]))
  ];

  constructor(private readonly waypointsService: WaypointsService) {
  }

  ngOnInit(): void {

  }

  mapClicked($event: LeafletMouseEvent) {
    this.addNewMarker($event)
    this.drawPolygone($event);
    this.createLayer();
    this.createRoute(this.route)
  }

  private drawPolygone(event: LeafletMouseEvent): void {
    this.routeBetweenMarkers.addLatLng(event.latlng)
  }

  private addNewMarker(event: LeafletMouseEvent) {
    this.listOfMarkers.push(marker(event.latlng, markerIconDefault))
    this.route.listOfWaypoints.push(this.waypointsService.createWaypoint(event.latlng))
  }

  private createLayer() {
    this.listOfPoints = [];
    this.listOfMarkers.forEach(x => this.listOfPoints.push(x));
    this.listOfPoints.push(this.routeBetweenMarkers)

  }

  private createRoute(route?: Route) {
    if (route != undefined) {
      this.waypointsService.setRoute(route)
    }
  }
}
