import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {AirportsDTO} from "@features/vfr-planning"
import {icon, Marker, marker, MarkerOptions} from "leaflet";
import {markerAirportIcon} from "../../constant";
import {AngularFireDatabase} from "@angular/fire/compat/database";


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private readonly httpRequest: HttpClient, private readonly db: AngularFireDatabase,) {
  }


  /** TODO add zones - ready endpoint **/


  findAirportsFromDB(): Observable<Marker[]> {
    return this.db.list<AirportsDTO>('/airports').valueChanges()
      .pipe(
        map((airport) => {
          return airport.map(data =>
            marker([data.coordinates.latitude, data.coordinates.longitude], this.createMarkerOptions(data)))
        }),
        shareReplay())
  }


  private createMarkerOptions(airport: AirportsDTO): MarkerOptions {
    return {
      title: airport.code,
      draggable: false,
      icon: icon(markerAirportIcon)
    } as MarkerOptions

  }
}
