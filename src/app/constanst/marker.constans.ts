import {icon, MarkerOptions} from "leaflet";

export let markerIconDefault: MarkerOptions = {

    icon: icon({

      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    }),
    draggable: true,
  }
;
