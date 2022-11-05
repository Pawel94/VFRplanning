import {FormControl} from "@angular/forms";
import {Airport} from "../../map/model/modelForMaps";

export interface waypointForm{
  placeByAirportName: FormControl<string>;
  lat: FormControl<string>;
  lng: FormControl<number|null>;
}
