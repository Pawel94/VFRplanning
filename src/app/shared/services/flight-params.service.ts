import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FlightParams} from "../model/flightParamsModel";

@Injectable({
  providedIn: 'root'
})
export class FlightParamsService {
  private flightParams$ = new BehaviorSubject<FlightParams>({planeVelocity: 120, flightLevel: 1000});
  selectFlightParams$ = this.flightParams$.asObservable()

  setParams(flightParams: FlightParams) {
    this.flightParams$.next(flightParams);
  }


}
