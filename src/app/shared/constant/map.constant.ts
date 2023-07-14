import {latLng, layerGroup, tileLayer} from "leaflet";

export const MAP_OPTIONS = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
  ],
  zoom: 7,
  center: latLng(52.06, 19.25)

};


export const MAP_LAYERS = {
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
