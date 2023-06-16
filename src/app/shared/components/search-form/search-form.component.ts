import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {latAndLngFormGroup, WaypointForm} from "../../../features/vfr-planning/types/form-control";
import {debounceTime, distinctUntilChanged, map, Observable, Subject} from "rxjs";
import {CommonService} from "../../../common/services/communication/firebase-communication/common.service";
import {Waypoint} from "../../model/waypoint";
import {v4 as uuid} from "uuid";
import {correctValueIsRequaired, latitudeValueIsNotCorrect, longitudeValueIsNotCorrect} from '../../utils/utils-forms';
import {LatLng, Marker} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";
import {CityDto} from "../../model/city";

@Component({
  selector: 'vfr-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {


  @Output() addOrEditWaypoint = new EventEmitter<Waypoint>();

  @Input() public editedWaypoint?: Waypoint;

  private listOfCitiesFromDB: CityDto[] = [];

  private unsubscribeSignal: Subject<void> = new Subject();

  inputModel: string = "";

  waypointForm: FormGroup = new FormGroup<WaypointForm>({
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
  }


  ngOnInit(): void {
    this.common.getCitiesFromDB()
      .subscribe(element => {
        this.listOfCitiesFromDB = element;
      });

    this.setInitialFormValues();
  }

  submitWaypointForm(): void {
    const latLng = new LatLng(Number(this.latFormControl?.value), Number(this.lngFormControl?.value));
    if (this.editedWaypoint) {
      this.editedWaypoint.city = this.inputModel;
      this.editedWaypoint?.setLatLng(latLng)
      this.addOrEditWaypoint.emit(this.editedWaypoint)
    } else {
      const markerToAdd = new Marker(latLng, markerIconDefault) as Waypoint;
      markerToAdd.city = this.inputModel;
      markerToAdd.id = uuid()
      this.addOrEditWaypoint.emit(markerToAdd)
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


  onSelectedCity(object: any) {

    const {city, ...rest} = this.listOfCitiesFromDB.find(el => el.city === object.item) ?? {}
    this.latAndLngFormGroup?.patchValue({
      ...rest
    })
  }

  private setInitialFormValues() {
    if (this.editedWaypoint) {
      this.latAndLngFormGroup!.patchValue({
        latitude: this.editedWaypoint.getLatLng().lat,
        longitude: this.editedWaypoint.getLatLng().lng
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listOfCitiesFromDB.map(place => place.city).filter(c => c.toLowerCase().startsWith(term.toLowerCase())).slice(0, 10)),
    );
}


