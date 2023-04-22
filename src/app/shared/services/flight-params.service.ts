import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FlightParams} from "../model/flightParamsModel";
import {ToastrService} from "ngx-toastr";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class FlightParamsService {
  private flightParams$ = new BehaviorSubject<FlightParams>({planeVelocity: 120, flightLevel: 1000});
  selectFlightParams$ = this.flightParams$.asObservable()

  constructor(private readonly notification: ToastrService,
              private readonly transloco: TranslocoService) {
  }

  setParams(flightParams: FlightParams) {

    if (flightParams) {
      this.notification.success(this.transloco.translate(
        'flightParameters.params', {...flightParams}
      ), this.transloco.translate(
        'flightParameters.success'
      ),);

      this.flightParams$.next(flightParams);
    } else {
      this.notification.error(this.transloco.translate(
        'flightParameters.error'
      ),);
    }

  }


}
