import {Component, OnInit} from '@angular/core';
import {circle, latLng, LeafletMouseEvent, marker, tileLayer} from "leaflet";

@Component({
  selector: 'vfr-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
      circle([46.95, -122], {radius: 5000}),
      marker([46.879966, -121.726909],)
    ],
    zoom: 7,
    center: latLng(52.06, 19.25)

  };
  listOfPoints = [
    circle([ 46.95, -122 ], { radius: 5000 }),
    marker([ 46.879966, -121.726909 ])
  ];
  constructor() {
  }

  ngOnInit(): void {

  }

  mapClicked($event: LeafletMouseEvent) {
    this.listOfPoints.push(circle($event.latlng))
  }
}
