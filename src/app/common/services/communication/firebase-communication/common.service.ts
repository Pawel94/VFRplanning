import {Injectable} from '@angular/core';
import {Observable, shareReplay, switchMap} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FlightParamsService} from "../../../../shared/services/state/flight-state/flight-params.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly db: AngularFireDatabase,
              private readonly flightService: FlightParamsService) {
  }


  getCitiesFromDB(): Observable<any> {
    return this.db.list('/cities').valueChanges()
  }

  getPlanesFromDB(): Observable<any> {
    return this.db.list('/planes').valueChanges().pipe(shareReplay())
  }

  getDirectInfoAboutPlane(id: any): Observable<any> {
    return this.db.object(`planes/${id}`).valueChanges()
  }

  getPlaneFromDB(): Observable<any> {
    return this.flightService.selectFlightParams$.pipe(switchMap(params => this.getDirectInfoAboutPlane(params.planeTypeId)))
  }
}
