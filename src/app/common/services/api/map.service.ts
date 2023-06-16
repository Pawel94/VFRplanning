import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Airport} from "@features/vfr-planning"
import {Circle, circle} from "leaflet";


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private readonly httpRequest: HttpClient) {
  }

  AIRPORT_LINK = 'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'

  findAirportsFrom(searchCriteria?: string): Observable<Circle[]> {
    return this.httpRequest.get<Airport[]>(this.AIRPORT_LINK).pipe(
      map(element => element.filter(airport => airport.country === "Poland").map(airport => circle([airport.lat, airport.lon],{ radius: 5000 })))
    )
  }


}
