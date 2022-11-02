import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {MapService} from "../../../map/services/map.service";
import {Airport} from "../../../map/model/modelForMaps";
import {debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {RouteService} from "../../../shared/services/route.service";
import {Route} from 'src/app/shared/model/waypoint';
import {LatLng, Marker} from "leaflet";
import {markerIconDefault} from "../../../constanst/marker.constans";

@Component({
  selector: 'vfr-waypoint-manager',
  templateUrl: './waypoint-manager.component.html',
  styleUrls: ['./waypoint-manager.component.scss']
})
export class WaypointManagerComponent implements OnInit, OnDestroy {
  searchedOptions: Airport[] = [];
  public model: any;
  waypointForm!: FormGroup;
  byLatLng!: FormGroup;
  acceptedAirport!: Airport;
  private actualRoute!: Route;
  private isAddedMarkerByCity: boolean = false;
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly mapService: MapService,
              private readonly routeService: RouteService) {
    this.waypointForm = new FormGroup({
      placeByAirportName: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),


    });
    this.waypointForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeSignal.asObservable()),
        debounceTime(500),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(values => {
        this.toggleDisabledInputs(values);
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
    if (!this.isAddedMarkerByCity) {
      latLng = new LatLng(this.waypointForm.value.lat, this.waypointForm.value.lng);
    } else {
      latLng = new LatLng(Number(this.acceptedAirport.lat), Number(this.acceptedAirport.lon));

    }
    this.actualRoute?.listOfWaypoints.push(new Marker(latLng, markerIconDefault));
    this.routeService.setRoute(this.actualRoute);

  }

  private toggleDisabledInputs(formValues: any) {

    if ((formValues.lat === '' && formValues.lng === '') && (formValues.placeByAirportName === '' || formValues.placeByAirportName === undefined)) {
      this.waypointForm.get('placeByAirportName')?.enable()
      this.waypointForm.get('lat')?.enable()
      this.waypointForm.get('lng')?.enable()
    } else {
      if (formValues.placeByAirportName != '' && formValues.placeByAirportName != undefined) {
        this.isAddedMarkerByCity = true;
        this.waypointForm.get('lat')?.disable()
        this.waypointForm.get('lng')?.disable()

      } else {
        this.isAddedMarkerByCity = false;
        this.waypointForm.get('placeByAirportName')?.disable()
      }
    }
  }

}
