import {AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {MapService} from "../../common/services/api/map.service";
import {delay, distinctUntilChanged, map} from "rxjs";

export const correctValueIsRequaired: ValidatorFn = (control: AbstractControl) => {
  const lat = control.get('latitude');
  const lng = control.get('longitude');
  if (lat && lng) {
    return (lat.dirty || lng.dirty) && ((lat.value === null && lng.value != null) || (lat.value != null && lng.value === null))
      ? {latAndLatRequaired: true}
      : null;
  }

  return null;
};

export const latitudeValueIsNotCorrect: ValidatorFn = (control: AbstractControl) => {
  return (control.value > 180 || control.value < -180)
    ? {latitudeIsNotCorrect: true}
    : null;


};
export const longitudeValueIsNotCorrect: ValidatorFn = (control: AbstractControl) => {
  return (control.value > 180 || control.value < -180)
    ? {longitudeIsNotCorrect: true}
    : null;

};

// export function userExistsValidator(mapService: MapService): AsyncValidatorFn {
//   return (control: AbstractControl) => {
//     let placeByAirportName = control.value;
//     return mapService.findAirportsFrom("null")
//       .pipe(
//         delay(1000),
//         distinctUntilChanged(),
//         map(airport => airport.find(x => x.city === placeByAirportName) ? null : {airportNotExist: true})
//       );
//   }
// }
