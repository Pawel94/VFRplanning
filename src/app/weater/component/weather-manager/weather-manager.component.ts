import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {map, Observable, Subject} from "rxjs";
import {Weather} from "../../model/indexWeater";
import {CommonService} from "../../../common/services/common.service";
import {Airport} from "../../../map/model/modelForMaps";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Place} from "../../../shared/model/waypoint";

@Component({
  selector: 'vfr-weater-manager',
  templateUrl: './weather-manager.component.html',
  styleUrls: ['./weather-manager.component.scss']
})
export class WeatherManagerComponent implements OnInit, OnDestroy {
  @Input() fromParent!: Airport[];
  public type: string = "weather-form"
  actualWeatherIMGW$?: Observable<Weather>
  actualWeaterOpenMeteo?: Observable<Weather>
  actualWeather$?: Observable<Weather[]>
  listOfPlaces: Weather[] = [];
  private unsubscribeSignal: Subject<void> = new Subject();

  constructor(private readonly weatherService: WeatherService,
              private readonly common: CommonService,
              private readonly activeModal: NgbActiveModal) {
  }


  ngOnInit(): void {

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }

  addNewWeatherPoint(inputPlace: Place) {
    if (inputPlace.lat && inputPlace.lng) {
      this.actualWeather$ = this.weatherService.getWeatherDataFromOPEN_METEO(inputPlace.lat, inputPlace!.lng).pipe(
        map(place => {
          place.city = inputPlace.city ?? "NOT FIND"
          this.listOfPlaces.push(place);
          return this.listOfPlaces
        }))
    }
    /*TODO */
    console.error("TO CHECK THIS LOGIC ")
  }
}
