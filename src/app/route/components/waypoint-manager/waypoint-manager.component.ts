import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Airport} from "../../../map/model/modelForMaps";
import {debounceTime, delay, distinctUntilChanged, map, Observable, Subject, takeUntil} from "rxjs";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {RouteService} from "../../../shared/services/route.service";
import {Route} from 'src/app/shared/model/waypoint';
import {LatLng, Marker} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {latAndLngFormGroup, waypointForm} from "../../model";


@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager.component.html',
  styleUrls: ['./waypoint-manager.component.scss']
})
export class WaypointManagerComponent implements OnInit, OnDestroy {
  private searchedOptions: Airport[] = [];
  public model: any;
  waypointForm: FormGroup = new FormGroup<waypointForm>({
      latAndLng: new FormGroup<latAndLngFormGroup>({
        latitude: new FormControl<number | null>(null, {validators: latitudeValueIsNotCorrect}),
        longitude: new FormControl<number | null>(null, {validators: longitudeValueIsNotCorrect}),
      }, {validators: [correctValueIsRequaired]}),
      place: new FormGroup<any>({
        airport: new FormControl('', {nonNullable: true, asyncValidators: [userExistsValidator(this.mapService)]}),
      })

    },
  );
  private acceptedAirport!: Airport;
  private actualRoute!: Route;
  private isAddedMarkerByCity: boolean = false;
  private unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly mapService: MapService,
              private readonly routeService: RouteService,
  ) {

    this.waypointForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()),
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(values => {
        this.toggleDisabledInputs();
        console.log(values)
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

  search: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      takeUntil(this.unsubscribeSignal.asObservable()),
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.searchedOptions.filter((v) => v.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
      map(x => x.map(x => {
          this.acceptedAirport = x;
          return x.city
        }
      )),
    );


  ngOnInit(): void {
    this.mapService.findAirPortsFrom("null")
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(element => {
        this.searchedOptions = element;
      });

    this.routeService.selectedRoute$
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(route =>
        this.actualRoute = route);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }


  onSubmit() {
    let latLng;
    console.log(this.latFormControl?.value)
    console.log(this.lngFormControl?.value)
    console.log(this.isAddedMarkerByCity)
    if (!this.isAddedMarkerByCity) {
      latLng = new LatLng(Number(this.latFormControl?.value), Number(this.lngFormControl?.value));
      console.log(latLng)
    } else {
      latLng = new LatLng(Number(this.acceptedAirport.lat), Number(this.acceptedAirport.lon));
    }
    console.log(latLng)
    this.actualRoute?.listOfWaypoints.push(new Marker(latLng, markerIconDefault));
    this.routeService.setRoute(this.actualRoute);

  }

  private toggleDisabledInputs() {
    if (this.latAndLngFormGroup?.dirty && this.latAndLngFormGroup?.get('latitude')?.value != null || this.latAndLngFormGroup?.get('longitude')?.value != null) {
      this.airportFormControl?.disable();
      this.isAddedMarkerByCity = false;
    } else if (this.airportFormControl?.dirty && this.airportFormControl.value != '') {
      this.latAndLngFormGroup?.get('latitude')?.disable()
      this.latAndLngFormGroup?.get('longitude')?.disable()
      this.isAddedMarkerByCity = true;
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
    if (this.waypointForm.get("latAndLng")) {
      return this.waypointForm.get("latAndLng")
    } else {
      return null;
    }
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
