import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FlightParams} from "../model/flightParamsModel";
import {NotificationService} from "./notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class FlightParamsService {
  private flightParams$ = new BehaviorSubject<FlightParams>({planeVelocity: 120, flightLevel: 1000});
  selectFlightParams$ = this.flightParams$.asObservable()

  constructor(private readonly notification: NotificationService) {
  }

  setParams(flightParams: FlightParams) {
    if (flightParams) {
      this.notification.getSuccess('flightParameters.params', flightParams);
      this.flightParams$.next(flightParams);
    } else {
      this.notification.getFailure('flightParameters.error');
    }
  }
}
