import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FlightParams} from "@shared";
import {NotificationService} from "../../services";

@Injectable({
  providedIn: 'root'
})
export class FlightParamsService {
  private flightParams$ = new BehaviorSubject<FlightParams>({
    planeVelocity: 120,
    flightLevel: 1000,
    planeFuel:10,
    planeTypeId: 1
  });
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
