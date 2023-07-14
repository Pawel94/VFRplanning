import {icon, IconOptions, MarkerOptions} from "leaflet";

export let markerIconDefault: MarkerOptions = {

  icon: icon({

    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
  }),
  draggable: true,
};
export let markerAirport: MarkerOptions = {

  icon: icon({
    iconSize: [40, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "/assets/pictures/airport.png",
    shadowUrl: ""
  }),
  draggable: false,
};


export const markerAirportIcon: IconOptions = {
  iconSize: [40, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "/assets/pictures/airport.png",
  shadowUrl: ""
}


