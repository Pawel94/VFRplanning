import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

import {latAndLngFormGroup, waypointForm} from "../../../route/model";
import {debounceTime, delay, distinctUntilChanged, map, Observable, Subject, takeUntil, tap} from "rxjs";
import {Airport} from "../../../map/model/modelForMaps";
import {MapService} from "../../../map/services/map.service";
import {CommonService} from "../../../common/services/common.service";
import {Place} from "../../model/waypoint";

@Component({
  selector: 'vfr-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Output() dataFromForm = new EventEmitter<Place>();

  private listOfCitiesFromDB: any[] = [];
  private isAddedPointWithLatLng: boolean = false;
  private unsubscribeSignal: Subject<void> = new Subject();
  private placeToFind!: Place
  inputModel: any;

  waypointForm: FormGroup = new FormGroup<waypointForm>({
      latAndLng: new FormGroup<latAndLngFormGroup>({
        latitude: new FormControl<number | null>(null, {validators: latitudeValueIsNotCorrect}),
        longitude: new FormControl<number | null>(null, {validators: longitudeValueIsNotCorrect}),
      }, {validators: [correctValueIsRequaired]}),
      place: new FormGroup<any>({
        airport: new FormControl('', {nonNullable: true,}),
      })

    },
  );

  constructor(public readonly common: CommonService) {

    this.common.getCitiesFromDB()
      .subscribe(element => {
        this.listOfCitiesFromDB = element;
      });

    this.waypointForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()),
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(values => {
        this.toggleDisabledInputs();
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }


  getCityName: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      // takeUntil(this.unsubscribeSignal.asObservable()),
      debounceTime(1000),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.listOfCitiesFromDB.filter((v) => v.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
      map(x => x.map(x => x.city),))


  ngOnInit(): void {
  }

  onSubmit() {
    this.placeToFind = {
      lat: Number(this.latFormControl?.value),
      lng: Number(this.lngFormControl?.value),
      city: "to make"
    } as Place
    if (this.isAddedPointWithLatLng) {
      this.placeToFind = this.listOfCitiesFromDB.find(x => x.city === this.inputModel);
    }

    this.dataFromForm.emit(this.placeToFind);
  }

  private toggleDisabledInputs() {
    if (this.latAndLngFormGroup?.dirty && this.latAndLngFormGroup?.get('latitude')?.value != null || this.latAndLngFormGroup?.get('longitude')?.value != null) {
      this.airportFormControl?.disable();
      this.isAddedPointWithLatLng = false;
    } else if (this.airportFormControl?.dirty && this.airportFormControl.value != '') {
      this.latAndLngFormGroup?.get('latitude')?.disable()
      this.latAndLngFormGroup?.get('longitude')?.disable()
      this.isAddedPointWithLatLng = true;
    } else {
      this.latAndLngFormGroup?.get('latitude')?.enable()
      this.latAndLngFormGroup?.get('longitude')?.enable()
      this.airportFormControl?.enable();

    }
  }

  get airportFormControl() {
    return this.waypointForm.get("place")?.get("airport");
  }

  get latFormControl() {
    return this.latAndLngFormGroup?.get("latitude");
  }

  get lngFormControl() {
    return this.latAndLngFormGroup?.get("longitude");
  }

  get latAndLngFormGroup() {
      return this.waypointForm.get("latAndLng")
  }

  checkIfLatitudeIsNull(): boolean {
    return this.latAndLngFormGroup?.get('latitude')?.value === null && this.latAndLngFormGroup?.get('longitude')?.value === null
  }

  checkIfLongitudeIsNull(): boolean {
    return this.latAndLngFormGroup?.get('longitude')?.value === null
  }

}

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

export function userExistsValidator(mapService: MapService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    let placeByAirportName = control.value;
    return mapService.findAirPortsFrom("null")
      .pipe(
        delay(1000),
        distinctUntilChanged(),
        map(airport => airport.find(x => x.city === placeByAirportName) ? null : {airportNotExist: true})
      );
  }
}
