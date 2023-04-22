import {FormControl, FormGroup} from "@angular/forms";

export interface waypointForm {
  place: FormGroup<placeFormGroup>
  latAndLng: FormGroup<latAndLngFormGroup>
}

export interface placeFormGroup{
  place:FormControl<string>
}
export interface latAndLngFormGroup{
  latitude:FormControl<number|null>
  longitude:FormControl<number|null>
}
