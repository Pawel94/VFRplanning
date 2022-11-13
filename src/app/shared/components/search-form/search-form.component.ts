import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {latAndLngFormGroup, waypointForm} from "../../../route/model";
import {debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil} from "rxjs";
import {CommonService} from "../../../common/services/common.service";
import {Waypoint} from "../../model/waypoint";
import {v4 as uuid} from "uuid";
import {correctValueIsRequaired, latitudeValueIsNotCorrect, longitudeValueIsNotCorrect} from '../../utils/utils-forms';

@Component({
  selector: 'vfr-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Output() dataFromForm = new EventEmitter<Waypoint>();
  @Output() resultOfEditedWaypoint = new EventEmitter<Waypoint>();
  @Input() public editedWaypoint?: Waypoint;
  @Input() public typeOfForm?: string;

  private listOfCitiesFromDB: any[] = [];
  private isAddedPointWithLatLng: boolean = false;
  private unsubscribeSignal: Subject<void> = new Subject();
  private placeToFind!: Waypoint

  inputModel: any;
  buttonText?: string;

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
    this.setButtonText();
    this.latAndLngFormGroup?.patchValue({
      latitude: this.editedWaypoint?.getLatLng().lat,
      longitude: this.editedWaypoint?.getLatLng().lng
    })
  }

  submitWaypointForm() {
    if (this.editedWaypoint) {
      this.editExistingWaypoint();
    } else {
      this.addNewPoint();
    }
  }

  private editExistingWaypoint() {
    this.editedWaypoint!.lat = Number(this.latFormControl?.value);
    this.editedWaypoint!.lng = Number(this.lngFormControl?.value);

    if (this.isAddedPointWithLatLng) {
      this.placeToFind = this.listOfCitiesFromDB.find(x => x.city === this.inputModel);
      this.editedWaypoint!.lat = this.placeToFind.lat
      this.editedWaypoint!.lng = this.placeToFind.lng
      this.editedWaypoint!.city = this.placeToFind.city
    }
    this.resultOfEditedWaypoint.emit(this.editedWaypoint);

  }

  addNewPoint() {
    this.placeToFind = {
      lat: Number(this.latFormControl?.value),
      lng: Number(this.lngFormControl?.value),
      city: "to make",
      id: uuid()
    } as Waypoint
    if (this.isAddedPointWithLatLng) {
      this.placeToFind = this.listOfCitiesFromDB.find(x => x.city === this.inputModel);
    }
    this.dataFromForm.emit(this.placeToFind);
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

  isWaypointForm(): boolean {
    return this.typeOfForm === "waypoint-form"
  }

  isWeatherForm(): boolean {
    return this.typeOfForm === "weather-form"
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

  private setButtonText(): void {
    if (this.isWaypointForm()) {
      this.buttonText = this.editedWaypoint !== undefined ? "Edit waypoint" : "Add new point"
    } else {
      this.buttonText = "Add new point"
    }
  }
}


