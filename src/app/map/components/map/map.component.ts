import {Component, OnInit} from '@angular/core';
import {circle, latLng, LeafletMouseEvent, Marker, marker, Polyline, polyline, tileLayer} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {
  poly: Polyline = polyline(([]));

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
  listOfMarkers: Marker[] = []
  listOfPoints = [
    circle([46.95, -122], {radius: 5000}),
    marker([46.879966, -121.726909]),
    polyline(([[28.635308, 77.22496], [46.879966, -121.726909]]))
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

  mapClicked($event: LeafletMouseEvent) {
    this.addNewMarker($event)
    this.drawPolygone($event);
    this.createLayer();
  }

  private drawPolygone(event: LeafletMouseEvent): void {
    this.poly.addLatLng(event.latlng)
  }

  private addNewMarker(event: LeafletMouseEvent) {
    this.listOfMarkers.push(marker(event.latlng, markerIconDefault))
  }

  private createLayer() {
    this.listOfPoints = [];
    this.listOfMarkers.forEach(x => this.listOfPoints.push(x));
    this.listOfPoints.push(this.poly)

    console.log(this.listOfPoints)
  }
}
