import {Injectable} from '@angular/core';
import {Observable, shareReplay, switchMap} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FlightParamsService} from "../../../+state/flight-state/flight-params.service";
import {CityDto} from "@shared";
import {
  PlaneType,
  PlaneTypeForSelect
} from "@features/vfr-parameters";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly db: AngularFireDatabase,
              private readonly flightService: FlightParamsService) {
  }


  getCitiesFromDB(): Observable<CityDto[]> {
    return this.db.list<CityDto>('/cities').valueChanges()
  }

  getPlanesFromDB(): Observable<PlaneTypeForSelect[]> {
    return this.db.list<PlaneTypeForSelect>('/planes').valueChanges().pipe(shareReplay())
  }

  getDirectInfoAboutPlane(id: number): Observable<PlaneType | null> {
    return this.db.object<PlaneType>(`planes/${id}`).valueChanges()
  }

  getPlaneFromDB(): Observable<PlaneType | null> {
    return this.flightService.selectFlightParams$.pipe(switchMap(params => this.getDirectInfoAboutPlane(params.planeTypeId)))
  }
}
